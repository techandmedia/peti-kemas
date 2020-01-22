import { data } from "./mock-data";

const formFields = [
  {
    label: "nomor ktp",
    field: "nik",
    initialValue: data.nik,
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
    initialValue: data.nama_lengkap,
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
    initialValue: data.nama_perusahaan
  },
  {
    label: "alamat lengkap",
    field: "alamat_lengkap",
    initialValue: data.alamat_lengkap,
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
    initialValue: data.nomor_telepon,
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
    initialValue: data.email
  },
  {
    label: "jumlah peti kemas",
    field: "jumlah_peti_kemas",
    initialValue: data.jumlah_peti_kemas,
    rules: [
      {
        required: true,
        message: "masukkan jumlah peti kemas!"
      }
    ]
  }
];

export { formFields };
