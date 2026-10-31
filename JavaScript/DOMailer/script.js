// ===== Referensi elemen =====
const emailList = document.getElementById("email-list");
const unreadCountEl = document.getElementById("unread-count");
const starredCountEl = document.getElementById("starred-count");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const selectAll = document.getElementById("select-all");
const bulkBar = document.getElementById("bulk-bar");
const selectedCountEl = document.getElementById("selected-count");
const composeModal = document.getElementById("compose-modal");
const composeForm = document.getElementById("compose-form");

let currentFilter = "all";
let nextId = initialEmails.length + 1;

// ===== Helper pembuat elemen =====
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function isHighPriority(subject) {
  return /\b(URGENT|IMPORTANT)\b/i.test(subject);
}

// ===== Feature 1: render data -> DOM =====
function createEmailRow(email) {
  const tr = el("tr", "email-row");
  tr.dataset.id = email.id;
  tr.classList.toggle("unread", !email.isRead);
  tr.classList.toggle("starred", email.isStarred);

  // checkbox
  const tdCheck = el("td", "cell-check");
  const cb = el("input", "row-check");
  cb.type = "checkbox";
  cb.setAttribute("aria-label", "Select email");
  tdCheck.appendChild(cb);

  // star
  const tdStar = el("td", "cell-star");
  const star = el("span", "star-btn", email.isStarred ? "\u2605" : "\u2606");
  star.dataset.action = "star";
  tdStar.appendChild(star);

  // sender
  const tdSender = el("td", "sender", email.sender);

  // subject & content (+ auto-categorization tag)
  const tdSubject = el("td", "cell-subject");
  const subject = el("div", "subject");
  if (isHighPriority(email.subject)) {
    tr.classList.add("high-priority");
    subject.appendChild(el("span", "priority-tag", "HIGH PRIORITY"));
  }
  subject.appendChild(document.createTextNode(email.subject));
  tdSubject.append(subject, el("div", "snippet", email.body));

  // date
  const tdDate = el("td", "date", email.date);

  // delete
  const tdAction = el("td", "cell-action");
  const del = el("button", "delete-btn", "Delete");
  del.type = "button";
  del.dataset.action = "delete";
  tdAction.appendChild(del);

  tr.append(tdCheck, tdStar, tdSender, tdSubject, tdDate, tdAction);
  return tr;
}

function renderEmails(emails) {
  const frag = document.createDocumentFragment();
  emails.forEach((e) => frag.appendChild(createEmailRow(e)));
  emailList.appendChild(frag);
}

// ===== Live counters (dihitung langsung dari DOM) =====
function updateCounters() {
  unreadCountEl.textContent = emailList.querySelectorAll(".email-row.unread").length;
  starredCountEl.textContent = emailList.querySelectorAll(".email-row.starred").length;
}

// ===== Selection state (master checkbox + bulk bar) =====
function getVisibleRows() {
  return [...emailList.querySelectorAll(".email-row:not(.is-hidden)")];
}
function getCheckedRows() {
  return [...emailList.querySelectorAll(".email-row .row-check:checked")].map((cb) => cb.closest(".email-row"));
}

function updateSelectionUI() {
  const visible = getVisibleRows();
  const checkedVisible = visible.filter((r) => r.querySelector(".row-check").checked);

  visible.forEach((r) => r.classList.toggle("selected", r.querySelector(".row-check").checked));

  selectedCountEl.textContent = checkedVisible.length;
  bulkBar.hidden = checkedVisible.length === 0;

  selectAll.checked = visible.length > 0 && checkedVisible.length === visible.length;
  selectAll.indeterminate = checkedVisible.length > 0 && checkedVisible.length < visible.length;
}

function refreshAll() {
  applyFilters();
  updateCounters();
}

// ===== Feature 4: filter + search =====
function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  let shown = 0;

  emailList.querySelectorAll(".email-row").forEach((row) => {
    const sender = row.querySelector(".sender").textContent.toLowerCase();
    const subject = row.querySelector(".subject").textContent.toLowerCase();

    const matchSearch = !q || sender.includes(q) || subject.includes(q);
    const matchCategory =
      currentFilter === "all" ||
      (currentFilter === "unread" && row.classList.contains("unread")) ||
      (currentFilter === "starred" && row.classList.contains("starred"));

    const visible = matchSearch && matchCategory;
    row.classList.toggle("is-hidden", !visible);
    if (visible) shown++;
    else row.querySelector(".row-check").checked = false; // baris tersembunyi tidak ikut terpilih
  });

  // empty state
  let empty = emailList.querySelector(".empty-row");
  if (shown === 0 && !empty) {
    empty = el("tr", "empty-row");
    const td = el("td", null, "No emails found.");
    td.colSpan = 6;
    empty.appendChild(td);
    emailList.appendChild(empty);
  } else if (shown > 0 && empty) {
    empty.remove();
  }

  updateSelectionUI();
}

searchInput.addEventListener("input", applyFilters);

document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  filterButtons.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  applyFilters();
});

// ===== Feature 3: Event Delegation pada #email-list (tanpa listener per baris) =====
emailList.addEventListener("click", (e) => {
  const row = e.target.closest(".email-row");
  if (!row) return;

  // Klik checkbox ditangani oleh event "change" di bawah
  if (e.target.closest(".cell-check")) return;

  const actionEl = e.target.closest("[data-action]");
  const action = actionEl ? actionEl.dataset.action : null;

  if (action === "star") {
    const starred = row.classList.toggle("starred");
    actionEl.textContent = starred ? "\u2605" : "\u2606";
  } else if (action === "delete") {
    row.remove();
  } else {
    row.classList.toggle("unread"); // klik baris = toggle read/unread
  }
  refreshAll();
});

// Feature 2: checkbox per baris (delegasi juga)
emailList.addEventListener("change", (e) => {
  if (e.target.classList.contains("row-check")) updateSelectionUI();
});

// ===== Feature 2: Select All + Bulk actions =====
selectAll.addEventListener("change", () => {
  getVisibleRows().forEach((r) => (r.querySelector(".row-check").checked = selectAll.checked));
  updateSelectionUI();
});

document.getElementById("bulk-read").addEventListener("click", () => {
  getCheckedRows().forEach((r) => {
    r.classList.remove("unread");
    r.querySelector(".row-check").checked = false;
  });
  refreshAll();
});

document.getElementById("bulk-delete").addEventListener("click", () => {
  getCheckedRows().forEach((r) => r.remove());
  refreshAll();
});

// ===== Feature 5: Compose modal + auto-categorization =====
function openCompose() {
  composeModal.hidden = false;
  document.getElementById("compose-subject").focus();
}
function closeCompose() {
  composeModal.hidden = true;
  composeForm.reset();
}

document.getElementById("open-compose").addEventListener("click", openCompose);
document.getElementById("cancel-compose").addEventListener("click", closeCompose);
composeModal.addEventListener("click", (e) => { if (e.target === composeModal) closeCompose(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !composeModal.hidden) closeCompose(); });

composeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const email = {
    id: String(nextId++),
    sender: document.getElementById("compose-sender").value.trim(),
    subject: document.getElementById("compose-subject").value.trim(),
    body: document.getElementById("compose-body").value.trim(),
    date: now,
    isRead: false,
    isStarred: false
  };

  emailList.prepend(createEmailRow(email)); // masuk paling atas
  closeCompose();
  refreshAll();
});

// ===== Init =====
renderEmails(initialEmails);
refreshAll();
