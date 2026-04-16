import { create } from 'zustand';
import { initialMails, initialDatUsers, initialDialers } from '../data/dummyData';

const checkAutoUnpaidSingle = (items) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return items.map(item => {
    const endDate = new Date(item.end_date);
    endDate.setHours(0, 0, 0, 0);
    if (endDate < today && item.status !== 'Unpaid') {
      return { ...item, status: 'Unpaid' };
    }
    return item;
  });
};

const checkAutoUnpaidNested = (treeData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return treeData.map(typeLevel => {
    return {
      ...typeLevel,
      mails: typeLevel.mails.map(mailLevel => {
        return {
          ...mailLevel,
          users: mailLevel.users.map(u => {
            const endDate = new Date(u.end_date);
            endDate.setHours(0, 0, 0, 0);
            if (endDate < today && u.status !== 'Unpaid') {
              return { ...u, status: 'Unpaid' };
            }
            return u;
          })
        };
      })
    };
  });
};

export const useStore = create((set, get) => ({
  theme: 'dark',
  bin: [],

  // Authentication
  isAuthenticated: false,
  login: (username, password) => set((state) => {
    // Hardcoded simple authentication check
    if (username === 'admin' && password === 'ASH@Dashboard2026!') {
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  }),
  logout: () => set({ isAuthenticated: false }),

  setInitialTheme: () => {
    document.documentElement.classList.add('dark');
  },
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    return { theme: newTheme };
  }),

  // DAT Hierarchy
  datUsers: checkAutoUnpaidNested(initialDatUsers),
  
  addDatMail: (datType, newMail) => set((state) => ({
    datUsers: state.datUsers.map(typeGroup => {
      if (typeGroup.dat_type === datType) {
        return { ...typeGroup, mails: [...typeGroup.mails, newMail] };
      }
      return typeGroup;
    })
  })),

  addDatUser: (datType, mailId, user) => set((state) => ({
    datUsers: checkAutoUnpaidNested(state.datUsers.map(typeGroup => {
      if (typeGroup.dat_type === datType) {
        return {
          ...typeGroup,
          mails: typeGroup.mails.map(m => {
            if (m.id === mailId) {
              return { ...m, users: [...m.users, user] };
            }
            return m;
          })
        };
      }
      return typeGroup;
    }))
  })),

  deleteDatMail: (datType, mailId) => set((state) => ({
    datUsers: state.datUsers.map(typeGroup => {
      if (typeGroup.dat_type === datType) {
        return { ...typeGroup, mails: typeGroup.mails.filter(m => m.id !== mailId) };
      }
      return typeGroup;
    })
  })),

  importDatUsers: (datType, mailId, parsedUsersArray) => set((state) => ({
    datUsers: checkAutoUnpaidNested(state.datUsers.map(typeGroup => {
      if (typeGroup.dat_type === datType) {
        return {
          ...typeGroup,
          mails: typeGroup.mails.map(m => {
            if (m.id === mailId) {
              return { ...m, users: [...m.users, ...parsedUsersArray] };
            }
            return m;
          })
        };
      }
      return typeGroup;
    }))
  })),

  deleteDatUser: (userId) => set((state) => {
    let deletedUser = null;
    let deletedFromType = null;
    let deletedFromMail = null;

    const newDatUsers = state.datUsers.map(typeGroup => {
       return {
         ...typeGroup,
         mails: typeGroup.mails.map(m => {
            const tgt = m.users.find(u => u.id === userId);
            if (tgt) {
               deletedUser = tgt;
               deletedFromType = typeGroup.dat_type;
               deletedFromMail = m;
            }
            return { ...m, users: m.users.filter(u => u.id !== userId) }
         })
       };
    });

    if (deletedUser) {
      return {
        datUsers: newDatUsers,
        bin: [
          ...state.bin, 
          { 
             ...deletedUser, 
             deleted_at: new Date().toISOString(),
             original_dat_type: deletedFromType,
             original_mail_id: deletedFromMail.id,
             original_mail_name: deletedFromMail.screen_name || deletedFromMail.mail_name
          }
        ]
      };
    }
    return { datUsers: newDatUsers };
  }),

  updateDatStatus: (userId, status) => set((state) => ({
    datUsers: state.datUsers.map(typeGroup => ({
      ...typeGroup,
      mails: typeGroup.mails.map(m => ({
        ...m,
        users: m.users.map(u => u.id === userId ? { ...u, status } : u)
      }))
    }))
  })),

  editDatUser: (userId, updatedFields) => set((state) => ({
    datUsers: checkAutoUnpaidNested(state.datUsers.map(typeGroup => ({
      ...typeGroup,
      mails: typeGroup.mails.map(m => ({
        ...m,
        users: m.users.map(u => {
           if (u.id === userId) {
             const historyObj = {
               price: u.price,
               status: u.status,
               start_date: u.start_date,
               end_date: u.end_date,
               modified_at: new Date().toISOString(),
               action: 'Updated'
             };
             return { 
               ...u, 
               ...updatedFields, 
               history: [...(u.history || []), historyObj] 
             };
           }
           return u;
        })
      }))
    })))
  })),

  // Bin Logic
  restoreDatUser: (binId) => set((state) => {
    const userToRestore = state.bin.find(b => b.id === binId);
    if (!userToRestore) return state;

    const { deleted_at, original_dat_type, original_mail_id, original_mail_name, ...cleanUser } = userToRestore;

    let newDatUsers = state.datUsers.map(typeGroup => {
      if (typeGroup.dat_type === original_dat_type) {
        let foundMail = false;
        const newMails = typeGroup.mails.map(m => {
           if (m.id === original_mail_id) {
              foundMail = true;
              return { ...m, users: [...m.users, cleanUser] };
           }
           return m;
        });
        
        if (!foundMail) {
           newMails.push({
              id: original_mail_id,
              mail_name: 'Restored Mail',
              screen_name: original_mail_name,
              users: [cleanUser]
           });
        }
        return { ...typeGroup, mails: newMails };
      }
      return typeGroup;
    });

    return {
      datUsers: checkAutoUnpaidNested(newDatUsers),
      bin: state.bin.filter(b => b.id !== binId)
    };
  }),

  emptyBin: () => set({ bin: [] }),
  permanentlyDeleteFromBin: (binId) => set(state => ({ bin: state.bin.filter(b => b.id !== binId) })),

  // Dialers (Flat List)
  dialers: checkAutoUnpaidSingle(initialDialers),
  addDialer: (dialer) => set((state) => ({
    dialers: checkAutoUnpaidSingle([...state.dialers, dialer])
  })),
  importDialers: (parsedArray) => set((state) => ({
    dialers: checkAutoUnpaidSingle([...state.dialers, ...parsedArray])
  })),
  deleteDialer: (id) => set((state) => ({
    dialers: state.dialers.filter(d => d.id !== id)
  })),
  updateDialerStatus: (id, status) => set((state) => ({
    dialers: state.dialers.map(d => d.id === id ? { ...d, status } : d)
  })),

  // Metrics Lookups
  getDatMetrics: () => {
    const users = [];
    const breakdown = { 'Single Search': 0, 'Double Search': 0, 'Unlimited Search': 0 };
    get().datUsers.forEach(typeGroup => {
      typeGroup.mails.forEach(m => {
        users.push(...m.users);
        if (breakdown[typeGroup.dat_type] !== undefined) {
           breakdown[typeGroup.dat_type] += m.users.length;
        }
      });
    });
    const totalRevenue = users.reduce((acc, u) => acc + (Number(u.price) || 0), 0);
    const paidRevenue = users.filter(u => u.status === 'Paid').reduce((acc, u) => acc + (Number(u.price) || 0), 0);
    const unpaidRevenue = users.filter(u => u.status === 'Unpaid').reduce((acc, u) => acc + (Number(u.price) || 0), 0);
    return {
      total: users.length,
      paid: users.filter(u => u.status === 'Paid').length,
      unpaid: users.filter(u => u.status === 'Unpaid').length,
      totalRevenue, paidRevenue, unpaidRevenue,
      breakdown
    };
  },
  
  getDialerMetrics: () => {
    const users = get().dialers;
    const breakdown = { 'Zoom': 0, 'Google Voice': 0, 'Teams': 0, 'Other': 0 };
    users.forEach(u => {
      if (breakdown[u.dialer_type] !== undefined) {
         breakdown[u.dialer_type]++;
      } else {
         breakdown['Other']++;
      }
    });

    const totalRevenue = users.reduce((acc, sum) => acc + (Number(sum.price) || 0), 0);
    const paidRevenue = users.filter(u => u.status === 'Paid').reduce((acc, sum) => acc + (Number(sum.price) || 0), 0);
    const unpaidRevenue = users.filter(u => u.status === 'Unpaid').reduce((acc, sum) => acc + (Number(sum.price) || 0), 0);
    return {
      total: users.length,
      paid: users.filter(u => u.status === 'Paid').length,
      unpaid: users.filter(u => u.status === 'Unpaid').length,
      totalRevenue, paidRevenue, unpaidRevenue,
      breakdown
    };
  }
}));
