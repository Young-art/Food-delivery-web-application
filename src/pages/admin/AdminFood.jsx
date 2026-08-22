import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { FOOD_ITEMS } from '../../data/mockData';
import { Badge, DietBadge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

export const AdminFood = () => {
  const [items, setItems] = useState(FOOD_ITEMS);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showToast } = useToast();

  const [newDish, setNewDish] = useState({
    name: '',
    category: 'pizza',
    price: '',
    veg: true,
    description: '',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this dish from the menu?')) {
      setItems(prev => prev.filter(i => i.id !== id));
      showToast('Dish deleted successfully', 'info');
    }
  };

  const handlePriceUpdate = (id, newPrice) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, price: Number(newPrice) } : i));
    showToast(`Price updated to ₹${newPrice}`, 'success');
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    const dish = {
      id: `dish-${Date.now()}`,
      ...newDish,
      price: Number(newDish.price),
      rating: 4.8,
      reviewsCount: 1,
      restaurantName: "La Pino'z Pizzeria"
    };
    setItems([dish, ...items]);
    setIsAddModalOpen(false);
    showToast(`"${dish.name}" added to menu!`, 'success');
  };

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Food Catalog Management" subtitle="Add dishes, manage pricing & stock availability">
      
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search dish name or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--surface)', outline: 'none' }}
          />
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={15} /> Add New Dish
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Dish</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Diet</th>
              <th style={{ padding: '12px 16px' }}>Price (₹)</th>
              <th style={{ padding: '12px 16px' }}>Rating</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <span style={{ fontWeight: '700' }}>{item.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge variant="primary">{item.category}</Badge>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <DietBadge isVeg={item.veg} />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <input
                    type="number"
                    defaultValue={item.price}
                    onBlur={e => handlePriceUpdate(item.id, e.target.value)}
                    style={{ width: '80px', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontWeight: '700' }}
                  />
                </td>
                <td style={{ padding: '12px 16px', fontWeight: '700', color: '#D97706' }}>
                  ⭐ {item.rating}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Dish Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Dish</h3>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleAddDish}>
              <div className="modal-body">
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Dish Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Truffle Mushroom Pizza"
                    value={newDish.name}
                    onChange={e => setNewDish({ ...newDish, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Category</label>
                    <select
                      value={newDish.category}
                      onChange={e => setNewDish({ ...newDish, category: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                    >
                      <option value="pizza">Pizza</option>
                      <option value="burgers">Burgers</option>
                      <option value="biryani">Biryani</option>
                      <option value="chicken">Chicken</option>
                      <option value="chinese">Chinese</option>
                      <option value="mexican">Mexican</option>
                      <option value="healthy-food">Healthy Food</option>
                      <option value="desserts">Desserts</option>
                      <option value="beverages">Beverages</option>
                      <option value="ice-cream">Ice Cream</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Price (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 299"
                      value={newDish.price}
                      onChange={e => setNewDish({ ...newDish, price: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Food Type</label>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <input type="radio" checked={newDish.veg} onChange={() => setNewDish({ ...newDish, veg: true })} /> <DietBadge isVeg={true} /> Veg
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <input type="radio" checked={!newDish.veg} onChange={() => setNewDish({ ...newDish, veg: false })} /> <DietBadge isVeg={false} /> Non Veg
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Description</label>
                  <textarea
                    placeholder="Delicious ingredients..."
                    value={newDish.description}
                    onChange={e => setNewDish({ ...newDish, description: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none', height: '60px', resize: 'none' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save to Menu</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
