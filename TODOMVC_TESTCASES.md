# Functional Test Cases & Execution Report — TodoMVC (React)

- **Application URL**: `https://todomvc.com/examples/react/dist/`
- **Application Type**: Single Page Application (React)
- **Execution Engine**: Playwright MCP Server
- **Execution Date**: 2026-10-17 15:34:45 (UTC+7)
- **Document Version**: 1.1

---

## 1. Test Execution Summary

| Metric | Value |
| :--- | :--- |
| **Total Test Cases** | 31 |
| **Passed** | 31 (100%) |
| **Failed** | 0 (0%) |
| **Execution Status** | **PASSED** |

### Execution Breakdown by Module

| Module | Total TCs | Passed | Failed | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Initial Page State** | 1 | 1 | 0 | PASS |
| **Create Todo Item** | 5 | 5 | 0 | PASS |
| **Complete / Uncomplete Items** | 3 | 3 | 0 | PASS |
| **Toggle All Items** | 3 | 3 | 0 | PASS |
| **Edit Todo Item** | 5 | 5 | 0 | PASS |
| **Delete Todo Item** | 2 | 2 | 0 | PASS |
| **Counter & Pluralization** | 3 | 3 | 0 | PASS |
| **Clear Completed** | 3 | 3 | 0 | PASS |
| **Routing & Filters** | 5 | 5 | 0 | PASS |
| **State Persistence** | 1 | 1 | 0 | PASS |

---

## 2. Test Cases & Execution Results Table

| index | TC Name | Objective | Pre-Condition | Test Data | Steps | Expected | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| 1 | TC_INIT_01: Verify Default Page State | Verify initial UI layout when no todo items exist | Browser open on TodoMVC React page with empty state | N/A | 1. Navigate to `https://todomvc.com/examples/react/dist/`<br>2. Observe header, input field, main list, and footer. | 1. Header displays title `todos`.<br>2. Input field is visible with placeholder `"What needs to be done?"` and has focus.<br>3. Main section (`[data-testid="main"]`) and footer (`[data-testid="footer"]`) are hidden (`hidden` attribute is present, `display: none`). | Header is "todos", input placeholder is "What needs to be done?", main and footer have hidden attribute. | **PASS** |
| 2 | TC_ADD_01: Add Single Valid Todo Item | Verify user can successfully add a single todo item | On TodoMVC React page with empty list | Todo text: `"Buy groceries"` | 1. Click input `[data-testid="text-input"]`.<br>2. Type `"Buy groceries"`.<br>3. Press `Enter`. | 1. New item appears with label `"Buy groceries"`.<br>2. Checkbox is unchecked.<br>3. Input is cleared.<br>4. Main and footer become visible.<br>5. Counter displays `"1 item left!"`. | Item "Buy groceries" added, input cleared, main & footer visible, counter shows "1 item left!". | **PASS** |
| 3 | TC_ADD_02: Add Multiple Todo Items | Verify user can add multiple items sequentially in FIFO order | On TodoMVC React page | Item 1: `"Buy groceries"`<br>Item 2: `"Pay electricity bill"`<br>Item 3: `"Read book"` | 1. Enter `"Buy groceries"` and press `Enter`.<br>2. Enter `"Pay electricity bill"` and press `Enter`.<br>3. Enter `"Read book"` and press `Enter`. | 1. All 3 items are displayed in order of creation.<br>2. Counter displays `"3 items left!"`.<br>3. Input is cleared after each addition. | All 3 items displayed in order, counter shows "3 items left!". | **PASS** |
| 4 | TC_ADD_03: Auto-Trim Whitespace on New Item | Verify leading and trailing spaces are automatically trimmed | On TodoMVC React page | Todo text: `"   Clean the room   "` | 1. Enter `"   Clean the room   "` into input.<br>2. Press `Enter`. | 1. New item is created with trimmed text `"Clean the room"`.<br>2. Counter increments by 1. | Leading and trailing whitespace trimmed, item saved as "Clean the room". | **PASS** |
| 5 | TC_ADD_04: Reject Empty and Whitespace-Only Input | Verify empty string or whitespace-only inputs do not create any todo item | On TodoMVC React page | Input 1: `""`<br>Input 2: `"     "` | 1. Press `Enter` with empty input.<br>2. Type 5 spaces `"     "` and press `Enter`. | 1. No todo item is added.<br>2. Input field remains empty.<br>3. Main and footer remain hidden. | No items added to list, count is 0, main remains hidden. | **PASS** |
| 6 | TC_ADD_05: Add Todo with Special Characters and Unicode | Verify app correctly handles special characters, emojis, and unicode | On TodoMVC React page | Todo text: `"Test !@#$%^&*()_+ 🚀 Vietnamese: Học Playwright"` | 1. Enter `"Test !@#$%^&*()_+ 🚀 Vietnamese: Học Playwright"`.<br>2. Press `Enter`. | 1. Item is added displaying exact characters and emojis without distortion or XSS injection.<br>2. Counter increments properly. | Item added with correct unicode and special characters without distortion. | **PASS** |
| 7 | TC_TOGGLE_01: Complete a Single Todo Item | Verify clicking item checkbox marks item as completed | List contains 1 active item: `"Buy groceries"` | N/A | 1. Click checkbox `[data-testid="todo-item-toggle"]` of `"Buy groceries"`. | 1. Checkbox becomes checked.<br>2. Item `<li>` gains class `"completed"`.<br>3. Text has strikethrough styling.<br>4. Counter decrements to `"0 items left!"`.<br>5. `"Clear completed"` button becomes visible. | Item marked as completed, class contains completed, counter shows 0 items left!, Clear completed visible. | **PASS** |
| 8 | TC_TOGGLE_02: Re-activate a Completed Todo Item | Verify clicking checkbox of completed item unchecks it and restores active status | List contains 1 completed item: `"Buy groceries"` | N/A | 1. Click checked checkbox `[data-testid="todo-item-toggle"]` of `"Buy groceries"`. | 1. Checkbox becomes unchecked.<br>2. Class `"completed"` is removed.<br>3. Strikethrough is removed.<br>4. Counter increments to `"1 item left!"`.<br>5. `"Clear completed"` button is hidden. | Item restored to active, completed class removed, counter shows 1 item left!, Clear completed hidden. | **PASS** |
| 9 | TC_TOGGLE_03: Partial Completion Counter Accuracy | Verify counter only counts active items when mixed items exist | List contains 3 items: `"Task 1"`, `"Task 2"`, `"Task 3"` | N/A | 1. Check `"Task 1"`.<br>2. Check `"Task 3"`.<br>3. Leave `"Task 2"` unchecked. | 1. `"Task 1"` and `"Task 3"` marked completed.<br>2. Counter accurately displays `"1 item left!"` (only `"Task 2"`).<br>3. `"Clear completed"` button is visible. | Counter accurately displays "1 item left!" for Task 2, Clear completed button is visible. | **PASS** |
| 10 | TC_TOGGLE_ALL_01: Mark All Items as Completed | Verify clicking toggle-all checkbox marks all items as completed at once | List contains 3 active items | N/A | 1. Click toggle-all checkbox `[data-testid="toggle-all"]`. | 1. All 3 items are marked completed.<br>2. Toggle-all checkbox is checked (`checked = true`).<br>3. Counter displays `"0 items left!"`.<br>4. `"Clear completed"` button is visible. | All items marked completed, toggle-all is checked, counter shows 0 items left!. | **PASS** |
| 11 | TC_TOGGLE_ALL_02: Unmark All Items when All are Completed | Verify clicking toggle-all when all items are completed marks all items as active | All 3 items are completed, toggle-all is checked | N/A | 1. Click toggle-all checkbox `[data-testid="toggle-all"]`. | 1. All 3 items become active (unchecked).<br>2. Toggle-all checkbox becomes unchecked.<br>3. Counter displays `"3 items left!"`.<br>4. `"Clear completed"` button becomes hidden. | All items unmarked, toggle-all unchecked, counter shows 3 items left!. | **PASS** |
| 12 | TC_TOGGLE_ALL_03: Toggle-All State Sync on Manual Uncheck | Verify toggle-all checkbox unchecks itself if any single item is manually uncompleted | All 3 items are completed, toggle-all is checked | N/A | 1. Click checkbox of `"Task 1"` to uncomplete it. | 1. `"Task 1"` becomes active.<br>2. Toggle-all checkbox automatically becomes unchecked.<br>3. Counter updates to `"1 item left!"`. | Toggle-all checkbox unchecks automatically when one item is manually unchecked, counter is 1 item left!. | **PASS** |
| 13 | TC_EDIT_01: Activate Edit Mode via Double-Click | Verify double-clicking a todo item label opens edit input field | List contains item: `"Buy groceries"` | N/A | 1. Double-click on `[data-testid="todo-item-label"]` of `"Buy groceries"`. | 1. Item `<li>` gains class `"editing"`.<br>2. Edit input field `input.edit` appears with current value `"Buy groceries"`.<br>3. Edit input receives focus automatically. | Item has class "editing", input.edit appears with prefilled value "Buy groceries". | **PASS** |
| 14 | TC_EDIT_02: Save Edit Changes via Enter Key | Verify pressing Enter saves updated todo text and exits edit mode | Item `"Buy groceries"` is in edit mode | Updated text: `"Buy organic groceries"` | 1. Clear input and type `"Buy organic groceries"`.<br>2. Press `Enter`. | 1. Edit mode exits (class `"editing"` removed).<br>2. Item label displays `"Buy organic groceries"`.<br>3. Item count remains unchanged. | Edit saved via Enter, editing mode exited, label updated to "Buy organic groceries". | **PASS** |
| 15 | TC_EDIT_03: Save Edit Changes via Blur (Click Outside) | Verify clicking outside edit input saves modified text | Item `"Buy groceries"` is in edit mode | Updated text: `"Buy snacks and drinks"` | 1. Clear input and type `"Buy snacks and drinks"`.<br>2. Click outside input (e.g. click header `<h1>todos</h1>`). | 1. Edit mode exits.<br>2. Item label updates to `"Buy snacks and drinks"`. | Edit saved on blur, editing mode exited, label updated to "Buy snacks and drinks". | **PASS** |
| 16 | TC_EDIT_04: Trim Whitespace on Edit Save | Verify leading and trailing spaces are trimmed when saving edited todo | Item is in edit mode | Updated text: `"   Buy fresh fruit   "` | 1. Clear input and type `"   Buy fresh fruit   "`.<br>2. Press `Enter`. | 1. Item label saves as trimmed text `"Buy fresh fruit"`.<br>2. Edit mode exits. | Whitespace trimmed on save, label is "Buy fresh fruit". | **PASS** |
| 17 | TC_EDIT_05: Delete Item when Edited to Empty String | Verify clearing all text in edit mode and saving deletes item from list | List contains 2 items: `"Task A"`, `"Task B"`. `"Task A"` is in edit mode. | Text: `""` (empty string) | 1. Clear all text in edit input (`input.edit`).<br>2. Press `Enter` (or click outside). | 1. `"Task A"` is completely removed from list.<br>2. Only `"Task B"` remains.<br>3. Counter updates to `"1 item left!"`. | Item edited to empty string was deleted, only Task B remains, counter is 1 item left!. | **PASS** |
| 18 | TC_DEL_01: Delete Single Todo Item via Destroy Button | Verify clicking destroy button deletes specific item | List contains 2 items: `"Task 1"`, `"Task 2"` | N/A | 1. Hover over `"Task 1"` to reveal destroy button.<br>2. Click `[data-testid="todo-item-button"]` on `"Task 1"`. | 1. `"Task 1"` is removed from DOM.<br>2. `"Task 2"` remains in list.<br>3. Counter updates to `"1 item left!"`. | Task 1 deleted via destroy button, Task 2 remains, counter shows 1 item left!. | **PASS** |
| 19 | TC_DEL_02: Delete Last Remaining Item Resets Page | Verify deleting last item returns page to initial empty state | List contains only 1 item: `"Final Task"` | N/A | 1. Click destroy button on `"Final Task"`. | 1. `"Final Task"` is removed.<br>2. Item list is empty (`0` items).<br>3. Main section (`[data-testid="main"]`) and footer (`[data-testid="footer"]`) are hidden (`hidden=""`). | Last item deleted, list empty (count=0), main and footer hidden. | **PASS** |
| 20 | TC_COUNT_01: Singular Item Count Display | Verify counter displays singular form `"item"` when exactly 1 active item exists | On TodoMVC React page | Item: `"Solo Task"` | 1. Add `"Solo Task"`.<br>2. Observe footer counter `.todo-count`. | 1. Counter text displays `"1 item left!"` (singular `"item"`). | Counter accurately displays singular form "1 item left!". | **PASS** |
| 21 | TC_COUNT_02: Plural Item Count Display | Verify counter displays plural form `"items"` when 0 or 2+ active items exist | On TodoMVC React page | Items: `"Task 1"`, `"Task 2"` | 1. Add `"Task 1"` and `"Task 2"`.<br>2. Observe counter text.<br>3. Mark both items completed.<br>4. Observe counter text. | 1. With 2 active items, counter displays `"2 items left!"`.<br>2. When both completed, counter displays `"0 items left!"`. | Counter displays "2 items left!" for 2 items and "0 items left!" when all completed. | **PASS** |
| 22 | TC_COUNT_03: Counter Ignores Completed Items | Verify counter only counts active items and ignores completed ones | List has 2 active and 1 completed item | N/A | 1. Observe counter `.todo-count`. | 1. Counter displays `"2 items left!"`, excluding completed item from count. | Counter shows "2 items left!", accurately excluding the 1 completed item. | **PASS** |
| 23 | TC_CLEAR_01: Clear Completed Button Visibility | Verify Clear Completed button is visible only when at least 1 completed item exists | 2 active items in list | N/A | 1. Observe `button.clear-completed`.<br>2. Mark 1 item completed.<br>3. Observe `button.clear-completed`.<br>4. Uncheck completed item.<br>5. Observe `button.clear-completed`. | 1. Initially, button is hidden (`hidden=""`).<br>2. When 1 item completed, button becomes visible.<br>3. When item uncompleted, button becomes hidden again. | Clear completed button is hidden initially, becomes visible when item completed, hides when uncompleted. | **PASS** |
| 24 | TC_CLEAR_02: Clear Completed Removes Only Completed Items | Verify clicking Clear Completed removes completed items and preserves active items | List contains: `"Active 1"`, `"Completed 1"`, `"Active 2"`, `"Completed 2"` | N/A | 1. Click button `button.clear-completed`. | 1. `"Completed 1"` and `"Completed 2"` are deleted.<br>2. `"Active 1"` and `"Active 2"` remain intact.<br>3. Counter displays `"2 items left!"`.<br>4. Clear Completed button is hidden. | Completed items removed, Active 1 & Active 2 remained untouched, counter shows 2 items left!. | **PASS** |
| 25 | TC_CLEAR_03: Clear Completed When All Items Completed | Verify clearing completed when all items are completed resets to empty state | List contains 3 items, all marked completed | N/A | 1. Click `button.clear-completed`. | 1. All items are removed from list.<br>2. Main and footer sections are hidden (`hidden=""`).<br>3. Input field remains ready for new entry. | All items cleared, count=0, main and footer sections hidden. | **PASS** |
| 26 | TC_FILTER_01: Filter "All" Shows All Items | Verify "All" filter displays both active and completed items | List contains 1 active (`"Task A"`) and 1 completed (`"Task B"`) | N/A | 1. Click filter link `"All"` (`a[href="#/"]`). | 1. URL hash is `#/`.<br>2. Filter `"All"` has class `"selected"`.<br>3. Both `"Task A"` and `"Task B"` are displayed in list. | Filter "All" has class "selected", displays both active and completed items (count=2). | **PASS** |
| 27 | TC_FILTER_02: Filter "Active" Shows Only Active Items | Verify "Active" filter hides completed items and displays only active items | List contains 1 active (`"Task A"`) and 1 completed (`"Task B"`) | N/A | 1. Click filter link `"Active"` (`a[href="#/active"]`). | 1. URL hash updates to `#/active`.<br>2. Filter `"Active"` has class `"selected"`.<br>3. Only `"Task A"` is visible in list.<br>4. Counter still displays `"1 item left!"`. | Filter "Active" selected, displays only Task A, counter shows 1 item left!. | **PASS** |
| 28 | TC_FILTER_03: Filter "Completed" Shows Only Completed Items | Verify "Completed" filter hides active items and displays only completed items | List contains 1 active (`"Task A"`) and 1 completed (`"Task B"`) | N/A | 1. Click filter link `"Completed"` (`a[href="#/completed"]`). | 1. URL hash updates to `#/completed`.<br>2. Filter `"Completed"` has class `"selected"`.<br>3. Only `"Task B"` is visible in list. | Filter "Completed" selected, displays only Task B. | **PASS** |
| 29 | TC_FILTER_04: Direct URL Hash Navigation | Verify navigating directly to filter URLs pre-selects appropriate filter | List contains 1 active and 1 completed item | URLs: `#/active`, `#/completed` | 1. Navigate directly to `.../#/active`.<br>2. Check selected filter and visible items.<br>3. Navigate directly to `.../#/completed`.<br>4. Check selected filter and visible items. | 1. On `#/active`, `"Active"` link is selected and only active items shown.<br>2. On `#/completed`, `"Completed"` link is selected and only completed items shown. | Direct URL hash loads corresponding filter view correctly. | **PASS** |
| 30 | TC_FILTER_05: Dynamic Addition While in Active Filter | Verify adding new item while on "Active" filter shows new item immediately | List has 1 active item, on `#/active` view | New item: `"New Active Task"` | 1. Enter `"New Active Task"` in input field and press `Enter`. | 1. New item is immediately visible in active list.<br>2. Counter increments to `"2 items left!"`.<br>3. URL hash remains `#/active`. | New item added and immediately visible in #/active view (count=2, texts=["Task A","New Active Task"], counter="2 items left!", hash="#/active"). | **PASS** |
| 31 | TC_STATE_01: In-Memory State on Browser Reload | Verify React component state behavior upon page refresh | 2 items added to list | N/A | 1. Add `"Item 1"` and `"Item 2"`.<br>2. Refresh browser page (`page.reload()`). | 1. Page reloads cleanly.<br>2. State is reset to initial empty state (in-memory React state, not stored in localStorage).<br>3. Main and footer sections are hidden. | State reset to 0 items upon reload (in-memory React state), main & footer hidden. | **PASS** |

---

## 3. Detailed Execution Logs & Verified Behaviors

1. **Initial Rendering & Layout Validation**:
   - `[data-testid="main"]` and `[data-testid="footer"]` both properly carry the `hidden` attribute (`display: none;`) when the todo list has zero items.
   - The new todo input `[data-testid="text-input"]` has placeholder `"What needs to be done?"` and auto-focus enabled on initial mount.

2. **Input Validation & Trimming**:
   - Empty input submissions (pressing `Enter` without typing) or whitespace-only strings (e.g. `"     "`) are rejected; no DOM nodes are added, maintaining pristine initial state.
   - Padded strings such as `"   Clean the room   "` are trimmed by the application before committing to state, preventing accidental trailing spaces.
   - Special characters and Unicode (including Vietnamese characters and emojis: `"Test !@#$%^&*()_+ 🚀 Vietnamese: Học Playwright"`) are rendered safely without escaping flaws or layout breakage.

3. **Item Status Toggle & Toggle-All**:
   - Checking an item toggles its state, applies `.completed` styling (strikethrough text), and decrements the active count (`0 items left!`).
   - `#toggle-all` (`[data-testid="toggle-all"]`) functions as a master toggle: when checked, all items become completed; when clicked again while all are completed, all are marked active.
   - If all items are completed and one item is manually unchecked, `#toggle-all` instantly updates its state to unchecked.

4. **In-place Item Editing**:
   - Double-clicking `[data-testid="todo-item-label"]` activates edit mode (`li.editing`), rendering `<input class="edit" data-testid="text-input" aria-label="Edit todo">` prefilled with existing text.
   - Editing can be committed both via `Enter` keypress and by triggering `blur` (clicking outside).
   - Clearing all text inside the edit input and saving triggers automatic deletion of the item from the list.

5. **Filtering & Hash Routing**:
   - The filters (`All`, `Active`, `Completed`) dynamically filter the visible DOM list according to status without altering the underlying data.
   - The active count (`.todo-count`) consistently reflects only active items regardless of which filter is selected.
   - The URL hash routing (`#/`, `#/active`, `#/completed`) works bidirectionally: clicking filter links updates the URL hash, and navigating directly to hash routes pre-selects the corresponding filter view.

6. **State Storage Architecture**:
   - Testing verified that this specific React build stores items in React component memory state rather than browser `localStorage`. A full page reload correctly resets the application to its empty initial state.
