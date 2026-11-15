export function initShader() {
  const canvas = document.querySelector("[data-shader]");
  if (!canvas) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    canvas.closest("[data-shader-wrap]")?.setAttribute("data-static", "true");
    return;
  }

  const syncSize = () => {
    const w = canvas.clientWidth || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return;

  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
  const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  vec2 mouseNorm = u_mouse / u_resolution.xy;
  mouseNorm.x *= u_resolution.x / u_resolution.y;
  float distMouse = distance(st, mouseNorm);
  float mouseRipple = smoothstep(0.45, 0.0, distMouse) * 0.4;
  float t = u_time * 0.12;
  float n1 = snoise(st * 1.8 + vec2(t * 0.25, t * 0.15));
  float n2 = snoise(st * 3.6 - vec2(t * 0.2, n1 * 0.4) + vec2(mouseRipple * 0.8));
  float n3 = snoise(st * 7.0 + vec2(n2 * 0.3, t * 0.1));
  float field = n1 * 0.55 + n2 * 0.32 + n3 * 0.13 + mouseRipple * 0.25;
  vec3 butterCream = vec3(1.0, 0.976, 0.839);
  vec3 blushTint = vec3(1.0, 0.863, 0.863);
  vec3 dustyRose = vec3(0.847, 0.635, 0.635);
  vec3 sageMatcha = vec3(0.557, 0.651, 0.420);
  vec3 col = mix(butterCream, blushTint, smoothstep(-0.4, 0.2, field));
  col = mix(col, dustyRose, smoothstep(0.15, 0.65, field) * 0.7);
  col = mix(col, sageMatcha, smoothstep(0.55, 0.95, n2 + mouseRipple * 0.3) * 0.4);
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}`;

  const compile = (type, src) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, "a_position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uRes = gl.getUniformLocation(prog, "u_resolution");
  const uMouse = gl.getUniformLocation(prog, "u_mouse");
  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = 1 - (event.clientY - rect.top) / rect.height;
    mouse.x = nx * canvas.width;
    mouse.y = ny * canvas.height;
  });

  const render = (t) => {
    if (typeof ResizeObserver === "undefined") syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
