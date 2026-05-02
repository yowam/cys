# 🕊️ Confess Your Sins Website

**Confessions** is an anonymous, community-driven web application where users can share personal stories, secrets, and confessions in a safe, moderated environment.

Built with **Angular 20**, the app focuses on anonymity, content moderation, and smooth user experience with lazy-loaded modules and infinite scrolling.

---

## 🚀 Features

- 🧾 **Anonymous Confessions** — Share personal stories without revealing identity  
- 🔍 **Search Functionality** — Discover confessions by keywords  
- 🏷️ **Tags System** — Browse content by categories  
- ♾️ **Infinite Scroll** — Seamless content loading  
- 🔐 **Authentication & Account Management**  
- ✍️ **Post Creation with Exit Protection** (unsaved changes guard)  
- 🛡️ **Route Guards** for protected pages  
- ⚡ **Lazy Loading Modules** for performance optimization  
- 🧼 **Sanitized Content Rendering** using DOMPurify  
- 📱 **Responsive UI**

---

## 🧱 Tech Stack

- **Framework:** Angular 20  
- **Language:** TypeScript  
- **State & Async:** RxJS  
- **UI Enhancements:**
  - Angular CDK
  - ngx-infinite-scroll
  - ng-click-outside
- **Security:** DOMPurify  
- **Utilities:** UUID  

---

## 📂 Project Structure


src/
│── app/
│ ├── account/ # User account module (protected)
│ ├── confessions/ # Main feed & search module
│ ├── tags/ # Tags browsing module
│ ├── about/ # Policies & user agreement
│ ├── services/ # Guards & utilities
│ ├── login/ # Login page
│ ├── post/ # Create confession
│ ├── contact/ # Contact page
│ └── page-not-found/ # 404 page


---

## 🧭 Routing Overview

| Route           | Description |
|----------------|------------|
| `/`            | Redirects to `/confessions` |
| `/confessions` | Main feed |
| `/search`      | Search results |
| `/post`        | Create a confession |
| `/login`       | User login |
| `/account`     | User account (protected) |
| `/tags`        | Tag browsing |
| `/contact`     | Contact page |
| `/policies`    | User agreement & rules |
| `**`           | 404 page |

---

## 🔐 Route Guards

- **AuthGuard** — Protects authenticated routes (`/account`)  
- **ConfirmExitGuard** — Warns before leaving post creation with unsaved changes  
- **CanLoadAuthGuard** *(optional)* — Prevents lazy loading without auth  
- **CustomPreloadingStrategy** — Controls module preloading  

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/confessions.git

# Navigate into the project
cd confessions

# Install dependencies
npm install
▶️ Development
