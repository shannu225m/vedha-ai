import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  ShoppingCart,
  Download,
  Eye
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 45000, orders: 120 },
  { month: 'Feb', revenue: 52000, orders: 145 },
  { month: 'Mar', revenue: 48000, orders: 132 },
  { month: 'Apr', revenue: 61000, orders: 178 },
  { month: 'May', revenue: 55000, orders: 156 },
  { month: 'Jun', revenue: 67000, orders: 189 },
];

const productData = [
  { name: 'Rice (1kg)', value: 30, color: '#e97c07' },
  { name: 'Dal (500g)', value: 25, color: '#dc2626' },
  { name: 'Oil (1L)', value: 20, color: '#16a34a' },
  { name: 'Spices', value: 15, color: '#2563eb' },
  { name: 'Others', value: 10, color: '#7c3aed' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-secondary border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹3,28,000</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,320</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Products Sold</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4,567</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
              -2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">892</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              +5.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Inventory Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rice (1kg)</span>
                  <Badge variant="destructive">Low Stock</Badge>
                </div>
                <Progress value={15} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Dal (500g)</span>
                  <Badge className="bg-success">In Stock</Badge>
                </div>
                <Progress value={75} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Oil (1L)</span>
                  <Badge className="bg-warning text-warning-foreground">Medium</Badge>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Today's Highlights</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">45 orders completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm text-muted-foreground">3 pending payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">₹12,500 revenue today</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Export Reports</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Daily Sales Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Inventory Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Reports
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;