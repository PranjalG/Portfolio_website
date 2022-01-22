# Setting Default Values

# 1. Expenses

cost_per_serving = 1.0 
emp_labor_rate = 7.5
shop_rental = 800
util = 150
ads = 100

# 2. Income
sp = 4.0 
serving_sold = 500

print("Expenses:")
print("1. Cost per serving: 1.0")
print("2. Labor rate per hour: 7.5")
print("3. Shop rental per month: 800")
print("4. Utilities per month: 150")
print("5. Advertising budget per month: 100")

print("Income:")
print("6. Selling price (each): 4.0")
print("7. Servings sold per month: 500")

print("Analysis:")
print("8. Profit/Loss Calculation")

# Taking user input
print("Enter Selection: (0 to Exit)")
x = int(input())

if x==1:
  print("Enter Cost per serving: ")
  cost_per_serving == float(input())
if x==2:
  print("Enter Labor rate per hour: ")
  emp_labor_rate == float(input())
if x==3:
  print("Enter Shop rental per month: ")
  shop_rental == int(input())
if x==4:
  print("Enter Utilities per month: ")
  util == int(input())
if x==5:
  print("Enter Advertising budget per month: ")
  ads == int(input())
if x==6:
  print("Enter Selling price (each): ")
  sp == float(input())
if x==7:
  print("Enter Servings sold per month: ")
  serving_sold == int(input())

print(cost_per_serving)
expenses = cost_per_serving*serving_sold + emp_labor_rate*8*6*4 + shop_rental + util + ads
income = sp*serving_sold
if(expenses > income):
  loss = expenses - income - 480
  loss_percent = loss/1000
  print("The Ice Cream Shop will have a monthly profit/loss of",loss,"or",loss_percent )




