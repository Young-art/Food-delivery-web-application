import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Badge } from '../../components/common/Badge';
import { BarChart3, TrendingUp, DollarSign, Award } from 'lucide-react';

export const AdminReports = () => {
  return (
    <AdminLayout title="Business Analytics & Reports" subtitle="Financial breakdowns, order metrics & top performing cuisines">
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Monthly GMV</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif' }}>₹4,82,450</div>
          <Badge variant="success" style={{ marginTop: '6px' }}>+24.5% vs Last Month</Badge>
        </div>

        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Avg Order Value (AOV)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif' }}>₹465</div>
          <Badge variant="primary" style={{ marginTop: '6px' }}>Healthy Basket Size</Badge>
        </div>

        <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Avg Delivery Speed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif' }}>24.2 Mins</div>
          <Badge variant="warning" style={{ marginTop: '6px' }}>Top 5% Industry Speed</Badge>
        </div>
      </div>

      {/* Top Cuisines Breakdown */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '18px' }}>Top Selling Cuisines Breakdown</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { cuisine: 'Biryani & Mughlai', percent: 38, count: '1,420 orders' },
            { cuisine: 'Artisanal Pizza', percent: 26, count: '980 orders' },
            { cuisine: 'Burgers & Wraps', percent: 18, count: '670 orders' },
            { cuisine: 'Chinese & Asian', percent: 12, count: '450 orders' },
            { cuisine: 'Healthy Bowls & Salads', percent: 6, count: '230 orders' }
          ].map(item => (
            <div key={item.cuisine}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '700', marginBottom: '4px' }}>
                <span>{item.cuisine}</span>
                <span>{item.percent}% ({item.count})</span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${item.percent}%`, height: '100%', background: 'linear-gradient(90deg, #FF4B2B, #FF416C)', borderRadius: 'var(--radius-full)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </AdminLayout>
  );
};
