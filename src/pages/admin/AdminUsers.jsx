import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { Users, Shield, Lock, Unlock } from 'lucide-react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: "usr-1", name: "Thanush Masika", email: "thanushmasika@gmail.com", phone: "8328247714", role: "Customer", status: "Active", orders: 12 },
    { id: "usr-2", name: "Ananya Sharma", email: "ananya.s@gmail.com", phone: "9876543210", role: "Customer", status: "Active", orders: 5 },
    { id: "usr-3", name: "Karthik Verma", email: "karthik.v@gmail.com", phone: "9123456789", role: "Customer", status: "Active", orders: 8 },
    { id: "usr-4", name: "Pooja Reddy", email: "pooja.r@gmail.com", phone: "9988776655", role: "Customer", status: "Active", orders: 3 }
  ]);

  const { showToast } = useToast();

  const toggleBlock = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        showToast(`User ${u.name} is now ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <AdminLayout title="Customer User Accounts" subtitle="Manage registered customers & account security">
      
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>User Name</th>
              <th style={{ padding: '12px 16px' }}>Email</th>
              <th style={{ padding: '12px 16px' }}>Phone</th>
              <th style={{ padding: '12px 16px' }}>Orders</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: '700' }}>{u.name}</td>
                <td style={{ padding: '12px 16px' }}>{u.email}</td>
                <td style={{ padding: '12px 16px' }}>{u.phone}</td>
                <td style={{ padding: '12px 16px', fontWeight: '700' }}>{u.orders}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge variant={u.status === 'Active' ? 'success' : 'offer'}>{u.status}</Badge>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => toggleBlock(u.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: u.status === 'Active' ? '#EF4444' : '#10B981',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {u.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AdminLayout>
  );
};
