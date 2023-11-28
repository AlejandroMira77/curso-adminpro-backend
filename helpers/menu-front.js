
const getMenuFront = (role = 'USER_ROLE') => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/' },
            { title: 'ProgressBar', url: 'progress' },
            { title: 'Graph 1', url: 'graph1' },
            { title: 'Promise', url: 'promises' },
            { title: 'RxJs', url: 'rxjs' }
          ]
        },
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            { title: 'Hospitales', url: 'hospitals' },
            { title: 'Médicos', url: 'medicos' }
          ]
        }
      ];

      if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'users' })
      }
      return menu;
}

module.exports = { getMenuFront };