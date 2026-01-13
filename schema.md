# Appwrite Database Schema

## Project Structure
- **Database ID**: `errorwiki_db` (or default unique ID)

## Collections

### 1. **Pages** (`pages`)
Stores static pages like About, Privacy Policy, etc.

| Attribute Name | Type | Size | Required | Array | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `title` | String | 255 | Yes | No | | Page Title |
| `slug` | String | 255 | Yes | No | | URL Slug (unique index) |
| `content` | String | 100000 | Yes | No | | HTML/Markdown Content |
| `seoTitle` | String | 255 | No | No | | SEO Meta Title |
| `seoDescription` | String | 500 | No | No | | SEO Meta Description |
| `status` | String | 50 | Yes | No | `draft` | `published` or `draft` |
| `publishedAt` | Datetime | | No | No | | Publication Date |

### 2. **Posts** (`posts`)
Stores error articles and blog posts.

| Attribute Name | Type | Size | Required | Array | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `title` | String | 255 | Yes | No | | Post Title |
| `slug` | String | 255 | Yes | No | | URL Slug (unique index) |
| `content` | String | 100000 | Yes | No | | HTML/Markdown Content |
| `tags` | String | 50 | No | Yes | | Array of tags |
| `category` | String | 100 | Yes | No | `Uncategorized` | Category Name |
| `difficulty` | String | 50 | No | No | `Beginner` | Beginner, Intermediate, Advanced |
| `language` | String | 50 | No | No | | Programming Language (e.g. JS, Python) |
| `viewCount` | Integer | | No | No | 0 | Number of views |
| `status` | String | 50 | Yes | No | `draft` | `published` or `draft` |
| `seoTitle` | String | 255 | No | No | | SEO Meta Title |
| `seoDescription` | String | 500 | No | No | | SEO Meta Description |

### 3. **Menus** (`menus`)
Stores navigation menu items.

| Attribute Name | Type | Size | Required | Array | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `label` | String | 100 | Yes | No | | Menu Item Label |
| `path` | String | 255 | Yes | No | | URL Path |
| `order` | Integer | | Yes | No | 0 | Sort Order |
| `parentId` | String | 255 | No | No | | ID of parent item for nested menus |
| `type` | String | 50 | Yes | No | `custom` | `page`, `post`, `custom` |

### 4. **Settings** (`settings`)
Stores global site settings.

| Attribute Name | Type | Size | Required | Array | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `key` | String | 255 | Yes | No | | Unique Key (e.g., `site_name`) |
| `value` | String | 10000 | No | No | | JSON string or text value |

## Indexes

- **pages**: Unique Index on `slug`.
- **posts**: Unique Index on `slug`.
- **menus**: Index on `order`.
