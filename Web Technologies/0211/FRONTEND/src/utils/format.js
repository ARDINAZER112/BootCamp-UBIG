export const rupiah = (n) => 'Rp. ' + Number(n).toLocaleString('id-ID')

export const statusClass = (status) =>
    ({ pending: 'badge-info', accepted: 'badge-success', rejected: 'badge-danger' }[status] ?? 'badge-secondary')

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)