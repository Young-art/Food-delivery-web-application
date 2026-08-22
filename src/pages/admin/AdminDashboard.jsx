import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useOrders } from '../../context/OrderContext';
import { Badge } from '../../components/common/Badge';
import { FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { DollarSign, ShoppingBag, Users, Store, ArrowUpRight, TrendingUp, Clock } from 'lucide-react';

export const AdminDashboard = () => {
  const { orders } = useOrders();

  const totalGMV = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 18450;
  const totalOrdersCount = orders.length + 142;

  return (
    <AdminLayout title="Admin Control Center" subtitle="Live performance metrics & system overview">
      
      {/* 4 Stat KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Gross Revenue</span>
            <Badge variant="success">+18.4%</Badge>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            ₹{totalGMV.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across all verified restaurants</div>
        </div>

        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Total Orders</span>
            <Badge variant="primary">LIVE</Badge>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>99.2% on-time fulfillment</div>
        </div>

        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Active Catalog</span>
            <Badge variant="warning">50+ DISHES</Badge>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            {FOOD_ITEMS.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>10 Curated categories</div>
        </div>

        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Partner Kitchens</span>
            <Badge variant="success">ACTIVE</Badge>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            {RESTAURANTS.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Average 4.8 star rating</div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Recent Customer Orders</h3>
          <Badge variant="primary">{orders.length} TOTAL</Badge>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px' }}>Order ID</th>
                <th style={{ padding: '10px 14px' }}>Restaurant</th>
                <th style={{ padding: '10px 14px' }}>Items</th>
                <th style={{ padding: '10px 14px' }}>Total</th>
                <th style={{ padding: '10px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: '700' }}>{order.id}</td>
                  <td style={{ padding: '12px 14px' }}>{order.restaurantName}</td>
                  <td style={{ padding: '12px 14px' }}>{order.items?.length || 1} items</td>
                  <td style={{ padding: '12px 14px', fontWeight: '800' }}>₹{order.total}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <Badge variant={order.status === 'Delivered' ? 'success' : 'primary'}>
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
};
