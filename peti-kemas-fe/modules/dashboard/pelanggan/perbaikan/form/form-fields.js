import { data } from "./mock-data";

export default function formRecords(records) {
  let record = {};
  if (records) {
    record = records;
  } else {
    record = data;
  }

  const formFields = [
    {
      label: "nomor antrian",
      field: "nomor_antrian",
      initialValue: record.nomor_antrian,
      rules: [
        {
          required: true,
          message: "masukkan nomor nomor_antrian!"
        }
      ]
    },
    {
      label: "status perbaikan",
      field: "status_perbaikan",
      initialValue: record.status_perbaikan,
      rules: [
        {
          required: true,
          message: "masukkan status perbaikan!"
        }
      ]
    },
    {
      label: "nomor ktp",
      field: "nik",
      initialValue: record.nik,
      rules: [
        {
          required: true,
          message: "masukkan nomor ktp!"
        }
      ]
    },
    {
      label: "nama lengkap",
      field: "nama_lengkap",
      initialValue: record.nama_lengkap,
      rules: [
        {
          required: true,
          message: "masukkan nama lengkap!"
        }
      ]
    },
    {
      label: "nama perusahaan",
      field: "nama_perusahaan",
      initialValue: record.nama_perusahaan
    },
    {
      label: "alamat lengkap",
      field: "alamat_lengkap",
      initialValue: record.alamat_lengkap,
      rules: [
        {
          required: true,
          message: "masukkan alamat!"
        }
      ]
    },

    {
      label: "nomor telepon",
      field: "nomor_telepon",
      initialValue: record.nomor_telepon,
      rules: [
        {
          required: true,
          message: "masukkan nomor telepon!"
        }
      ]
    },
    {
      label: "email",
      field: "email",
      initialValue: record.email
    },
    {
      label: "jumlah peti kemas",
      field: "jumlah_peti_kemas",
      initialValue: record.jumlah_peti_kemas,
      rules: [
        {
          required: true,
          message: "masukkan jumlah peti kemas!"
        }
      ]
    },
    {
      label: "jumlah dp",
      field: "jumlah_dp",
      initialValue: record.jumlah_dp,
      disabled: true
    },
    {
      label: "total tagihan (rp)",
      field: "jumlah_total",
      initialValue: record.jumlah_total,
      rules: [
        {
          required: true,
          message: "masukkan total tagihan!"
        }
      ]
    }
  ];

  return formFields;
}
