# new-profile

## 簡介
不知道已經是第幾代的作品集網頁。
歷史可以參考 histroy.md 檔案。

## 使用工具
* 本專案屬於純前端，不使用任何後端技術。網頁託管服務使用 [GitHub Pages]。
* 關於網頁技術，我使用的 CSS 框架為 [Kube]。JavaScript 框架則是 [Vue]。JavaScript 框架的目的，是把某些資料改用 JSON 的形式傳給網頁，並交由 Vue 渲染，以達到資料與外觀分離。
* 關於開發方面，我使用了 [gulp] 工具。可以在存檔時：
1. 把 SCSS 檔編譯為 CSS 檔並壓縮。
2. 把原始的 JavaScript 檔壓縮。
3. 自動重整網頁。

## 安裝方法
1. 初次下載完畢，請先確認 `package.json` 與 `gulpfile.js` 存在、並已經安裝含有 npm 的 node.js。
2. 輸入 `npm install` 安裝必要的程式。
3. 往後，就可以直接輸入 `npx gulp` 以啟動工作環境。
4. 請在 `src` 目錄下開發。

## 技術條件
* 本專案使用 `gulp-html-extend` 來分割 HTML 的頁面。不過，只需要懂得 HTML 的知識。
* 本專案使用 `gulp-sass` 來產生 CSS。你需要知道如何使用 [SASS] 這個 CSS 預處理器。
* 本專案使用 [Vue] 這個 JavaScript 框架。你需要知道 Vue 的用法。


[GitHub Pages]:https://pages.github.com/
[Kube]:https://imperavi.com/kube/
[Vue]:https://vuejs.org/
[gulp]:http://gulpjs.com/
[SASS]:http://sass-lang.com/