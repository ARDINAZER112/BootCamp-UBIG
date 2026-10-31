// (PASTE ARRAY initialEmails DI SINI)

// State Management
let emails = [...initialEmails]; // Copy array agar bisa dimutasi secara aman
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements - Menggunakan querySelector / getElementById sesuai referensi[cite: 7]
const emailListContainer = document.getElementById('email-list');
const countUnreadEl = document.getElementById('count-unread');
const countStarredEl = document.getElementById('count-starred');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const composeForm = document.getElementById('compose-form');
const btnToggleCompose = document.getElementById('btn-toggle-compose');
const masterCheckbox = document.getElementById('master-checkbox');
const bulkActionPanel = document.getElementById('bulk-action-panel');
const selectedCountEl = document.getElementById('selected-count');
const btnBulkRead = document.getElementById('btn-bulk-read');
const btnBulkDelete = document.getElementById('btn-bulk-delete');

/**
 * FEATURE 1: Dynamic Email Rendering & Live Counters[cite: 8]
 */
function updateCounters() {
    const unreadCount = emails.filter(email => !email.isRead).length;
    const starredCount = emails.filter(email => email.isStarred).length;
    countUnreadEl.textContent = unreadCount; // Menggunakan textContent agar aman dari XSS[cite: 7]
    countStarredEl.textContent = starredCount;
}

function renderEmails() {
    emailListContainer.innerHTML = ''; // Reset kontainer

    // Terapkan Filter & Pencarian
    let filteredEmails = emails.filter(email => {
        const matchesSearch = email.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              email.subject.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
        if (currentFilter === 'unread' && email.isRead) return false;
        if (currentFilter === 'starred' && !email.isStarred) return false;
        return true;
    });

    // Render Nodes
    filteredEmails.forEach(email => {
        const tr = document.createElement('tr'); // Membuat elemen HTML di memori[cite: 7]
        tr.dataset.id = email.id; // Menyimpan ID pada custom data attribute[cite: 8]
        tr.className = email.isRead ? 'row-read' : 'row-unread';

        // Deteksi keyword Urgent/Important (Feature 5 Challenge)[cite: 8]
        const isUrgent = email.subject.toUpperCase().includes('URGENT') || email.subject.toUpperCase().includes('IMPORTANT');
        
        // Membangun kerangka HTML internal (innerHTML)[cite: 7]
        tr.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td class="star-icon ${email.isStarred ? 'active' : ''}">★</td>
            <td class="cell-sender"></td>
            <td class="cell-subject">
                <strong></strong> <span class="badge-container"></span><br>
                <small class="cell-body"></small>
            </td>
            <td class="cell-date"></td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        // Memasukkan teks pengguna menggunakan textContent untuk mencegah XSS[cite: 7]
        tr.querySelector('.cell-sender').textContent = email.sender;
        tr.querySelector('.cell-subject strong').textContent = email.subject;
        tr.querySelector('.cell-body').textContent = email.body;
        tr.querySelector('.cell-date').textContent = email.date;
        
        if (isUrgent) {
            tr.querySelector('.badge-container').innerHTML = '<span class="urgent-tag">High Priority</span>';
        }

        emailListContainer.appendChild(tr); // Memasukkan ke DOM tree[cite: 7]
    });

    updateCounters();
    checkBulkStatus(); // Reset bulk panel setiap kali render ulang
    masterCheckbox.checked = false;
}

/**
 * FEATURE 4: Real-Time Smart Filter & Search[cite: 8]
 */
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderEmails();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active')); // Manipulasi classList[cite: 7]
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderEmails();
    });
});

/**
 * FEATURE 3: Interactive Row Actions via EVENT DELEGATION[cite: 7, 8]
 * Mencegah pemasangan event listener satu per satu pada baris email[cite: 8].
 */
emailListContainer.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row) return;

    const emailId = row.dataset.id;
    const emailIndex = emails.findIndex(em => em.id === emailId);

    // Tindakan: Toggle Checkbox
    if (e.target.classList.contains('row-checkbox')) {
        checkBulkStatus();
        return;
    }

    // Tindakan: Hapus Baris[cite: 8]
    if (e.target.classList.contains('delete-btn')) {
        emails.splice(emailIndex, 1);
        renderEmails();
        return;
    }

    // Tindakan: Toggle Star[cite: 8]
    if (e.target.classList.contains('star-icon')) {
        emails[emailIndex].isStarred = !emails[emailIndex].isStarred;
        renderEmails();
        return;
    }

    // Tindakan: Toggle Read/Unread (Klik dimana saja di baris selain elemen tombol/input)[cite: 8]
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        emails[emailIndex].isRead = !emails[emailIndex].isRead;
        renderEmails();
    }
});

/**
 * FEATURE 2: Advanced Action Panel (Bulk Actions)[cite: 8]
 */
function getCheckedRows() {
    return document.querySelectorAll('.row-checkbox:checked');
}

function checkBulkStatus() {
    const checkedRows = getCheckedRows();
    if (checkedRows.length > 0) {
        bulkActionPanel.classList.remove('hidden');
        selectedCountEl.textContent = `${checkedRows.length} item(s) selected`;
    } else {
        bulkActionPanel.classList.add('hidden');
    }
}

masterCheckbox.addEventListener('change', (e) => {
    const allCheckboxes = document.querySelectorAll('.row-checkbox');
    allCheckboxes.forEach(cb => cb.checked = e.target.checked);
    checkBulkStatus();
});

btnBulkRead.addEventListener('click', () => {
    const checkedRows = getCheckedRows();
    checkedRows.forEach(cb => {
        const rowId = cb.closest('tr').dataset.id;
        const index = emails.findIndex(em => em.id === rowId);
        emails[index].isRead = true;
    });
    renderEmails();
});

btnBulkDelete.addEventListener('click', () => {
    const checkedRows = getCheckedRows();
    const idsToDelete = Array.from(checkedRows).map(cb => cb.closest('tr').dataset.id);
    emails = emails.filter(email => !idsToDelete.includes(email.id));
    renderEmails();
});

/**
 * FEATURE 5: Quick Compose with Auto-Categorization[cite: 8]
 */
btnToggleCompose.addEventListener('click', () => {
    composeForm.classList.toggle('hidden');
});

composeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman secara default[cite: 7, 8]
    
    const newEmail = {
        id: Date.now().toString(),
        sender: document.getElementById('compose-sender').value, // Membaca nilai dari properti form secara langsung[cite: 7]
        subject: document.getElementById('compose-subject').value,
        body: document.getElementById('compose-body').value,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        isStarred: false
    };

    emails.unshift(newEmail); // Memasukkan elemen ke urutan teratas (prepend)[cite: 8]
    renderEmails();
    composeForm.reset();
    composeForm.classList.add('hidden');
});

// Inisialisasi Aplikasi Saat Halaman Dimuat
renderEmails();