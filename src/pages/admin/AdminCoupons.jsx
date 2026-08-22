import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { COUPONS } from '../../data/mockData';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { Tag, Plus, Trash2 } from 'lucide-react';

export const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(COUPONS);
  const { showToast } = useToast();

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;
    const added = {
      code: newCode.toUpperCase().trim(),
      discountPercent: Number(newDiscount),
      maxDiscount: 120,
      minOrder: 199,
      description: `${newDiscount}% OFF on orders above ₹199`
    };
    setCoupons([added, ...coupons]);
    setNewCode('');
    setNewDiscount('');
    showToast(`Coupon "${added.code}" created successfully!`, 'success');
  };

  const handleDelete = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast(`Coupon "${code}" deleted`, 'info');
  };

  return (
    <AdminLayout title="Coupons & Discount Promotions" subtitle="Configure marketing campaigns & percentage discounts">
      
      {/* Create Form */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '28px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '12px' }}>Create New Promo Code</h4>
        <form onSubmit={handleAddCoupon} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="COUPON CODE (e.g. FLASH40)"
            value={newCode}
            onChange={e => setNewCode(e.target.value.toUpperCase())}
            style={{ padding: '9px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none', fontWeight: '700' }}
            required
          />
          <input
            type="number"
            placeholder="Discount % (e.g. 40)"
            value={newDiscount}
            onChange={e => setNewDiscount(e.target.value)}
            style={{ width: '150px', padding: '9px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={15} /> Create Coupon
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {coupons.map(c => (
          <div
            key={c.code}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Badge variant="primary" style={{ fontSize: '0.85rem', padding: '4px 10px' }}>{c.code}</Badge>
                <Badge variant="success">{c.discountPercent}% OFF</Badge>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{c.description}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Min Order: ₹{c.minOrder}</span>
              <button
                onClick={() => handleDelete(c.code)}
                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </AdminLayout>
  );
};
