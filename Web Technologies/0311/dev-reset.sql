-- Dipakai oleh: ./dev.sh reset 0211
-- Mengosongkan data uji Postman (validation + pengajuan instalment).
-- Data master (societies, mobil, brand, dll) tidak disentuh.
DELETE FROM installment_apply_status;
DELETE FROM installment_apply_societies;
DELETE FROM validations;
