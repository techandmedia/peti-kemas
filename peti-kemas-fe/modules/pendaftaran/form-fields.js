const formFields = [
  {
    label: 'nama lengkap',
    field: 'nama_lengkap',
    rules: [{
      required: true,
      message: 'masukkan nama lengkap!',
    }],
  },
  {
    label: 'nama perusahaan',
    field: 'nama_perusahaan',
  },
  {
    label: 'alamat lengkap',
    field: 'alamat_lengkap',
    rules: [{
      required: true,
      message: 'masukkan alamat!',
    }],
  },

  {
    label: 'nomor telepon',
    field: 'nomor_telepon',
    rules: [{
      required: true,
      message: 'masukkan nomor telepon!',
    }],
  },
  {
    label: 'email',
    field: 'email',
  }

]

export { formFields }