const users = [
    {id:"410544b2-4001-4271-9855-fec4b6a6442a", name:"Bonaventure Batinamani", email: "expense.account@example.next", password: "Bon@2005tz" }
]

const categories = [
    {id: "cat-1", name: "Food"},
    {id: "cat-2", name: "Transport"},
    {id: "cat-3", name: "Utilities"},
    {id: "cat-4", name: "Personal Care"},
    {id: "cat-5", name: "Entertainment"},
    {id: "cat-1", name: "Health Care"},
    {id: "cat-1", name: "Education"},
    {id: "cat-1", name: "Donations"},
    {id: "cat-1", name: "Others"},
   
]

const expenses= [
    {user_id:"410544b2-4001-4271-9855-fec4b6a6442a", category_id:"cat-2", amount:"50340.00", date:"2026-08-10", description: "Bolt ride"},
    {user_id:"410544b2-4001-4271-9855-fec4b6a6442a", category_id:"cat-3", amount:"50076.00", date:"2026-08-23", description: "Stationaries"},
    {user_id:"410544b2-4001-4271-9855-fec4b6a6442a", category_id:"cat-1", amount:"5000.00", date:"2026-08-01", description: "Lunch"},
    {user_id:"410544b2-4001-4271-9855-fec4b6a6442a", category_id:"cat-4", amount:"6000.00", date:"2026-08-30", description: "Saffron"},
]

export {users, categories, expenses}