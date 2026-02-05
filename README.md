# 前端面試作業合併專案 (作業 3)

本專案是將「面試前端 作業 1」與「面試前端 作業 2」合併後的完整版網站。

## 合併內容

1. **作業 1: 計數器實作**
   - 使用 `useState` 處理數值邏輯。
   - 使用 Material UI 的 `ButtonGroup` 並透過 CSS API 進行樣式調整。
   - **額外實作**: Redux 工具包 (Redux Toolkit) 版本。
2. **作業 2: 氣象數據分析**
   - 使用 `fetch` 從 Open-Meteo API 獲取即時天氣數據。
   - 整合台北、倫敦與柏林的七天最高氣溫數據。
   - 使用 `Recharts` 進行視覺化分析（長條圖）。
   - 採用內建 Dark Mode 與 Glassmorphism (磨砂玻璃) 現代風格設計。

## 技術棧

- **框架**: React 19 + Vite
- **UI 庫**: Material UI (@mui/material), Lucide React (圖示庫)
- **狀態管理**: Redux Toolkit (@reduxjs/toolkit)
- **圖表庫**: Recharts
- **樣式**: Vanilla CSS (Scoped to components)

## 如何運行

1. 進入專案目錄：`cd "面試前端 作業3"`
2. 安裝依賴：`npm install`
3. 啟動開發伺服器：`npm run dev`
