# 🛒 Products Management App (Vanilla JS CRUD)

A simple web app for managing products using **pure HTML/CSS/JavaScript**, with storage in **localStorage**. You can create, read, update, delete and search products with total price calculation.

---

## ✨ Features

- Add new products with auto total price (price + taxes + ads - discount)
- Create multiple items at once using **count**
- Save products in `localStorage`
- Edit existing products
- Delete individual product
- Delete all products
- Search products by **title** or **category**
- Responsive footer adjustment

---

## 🧠 Technologies

- Vanilla JavaScript (no frameworks)
- HTML5 & CSS3
- Browser localStorage

---


---

## ⚙️ How to Use

1. Fill in the product information: title, price, taxes, ads, discount, count, category.
2. The **Total** updates automatically when typing.
3. Click **Create** to add the product(s).
4. Products show in a table below where you can:
   - Update
   - Delete
   - Search by title or category
5. All data persists even if you refresh the page (thanks to localStorage).

---

## 📦 Local Storage

All items are stored under the key `productData` in `localStorage`. You can click **Reset All** to clear all products from storage.

---

## 🧾 Functions Overview

| Function                 | Description                                   |
|--------------------------|-----------------------------------------------|
| `handelCreateBtn()`      | Add new products                              |
| `handelUpdateBtn()`      | Fill form with product data for editing       |
| `handelSaveBtn()`        | Save updated product                          |
| `handelDeleteBtn()`      | Delete a single product                       |
| `handelResetBtn()`       | Delete all products                           |
| `handelSearchByBtn()`    | Enable search by title or category            |
| `checkEmptyInputs()`     | Validation for empty fields                   |
| `updateUI()`             | Render product table on screen                |
| `totalChange()`          | Recalculate total price real-time             |
| `adjustFooterPosition()` | Adjust footer based on page height            |

---


## ✨ Author

Built with ❤️ by **Mostafa EARL Drsh**



