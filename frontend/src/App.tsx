import { useState, useEffect } from 'react';
import { Plus, PackageSearch, Search, Layers, Hexagon, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import type { Product } from './types';
import { productApi } from './api/productApi';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import StatsCard from './components/StatsCard';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await productApi.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateOrUpdate = async (productData: Product) => {
    try {
      if (editingProduct?.id) {
        await productApi.update(editingProduct.id, productData);
      } else {
        await productApi.create(productData);
      }
      setShowForm(false);
      setEditingProduct(undefined);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.delete(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen text-slate-200 selection:bg-indigo-500/30 pb-20 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/5 blur-[160px] animate-pulse-slow"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/5 blur-[160px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/[0.03] bg-background/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                <Hexagon className="text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="currentColor" fillOpacity={0.2} size={28} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
                NEXUS<span className="text-indigo-500">.</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Inventory Management</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingProduct(undefined);
              setShowForm(true);
            }}
            className="hidden sm:flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.2rem] font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 border border-indigo-400/20"
          >
            <Plus size={20} strokeWidth={3} />
            Add Entity
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Header Section */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 animate-fade-in-up">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black tracking-widest uppercase mb-6">
              <Activity size={14} /> System Status: Optimal
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tightest leading-[1.1]">
              Refine your <br />
              <span className="text-gradient">Digital Catalog.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed opacity-80">
              A state-of-the-art orchestration layer for your inventory ecosystem.
              Track, manage, and scale with unparalleled precision.
            </p>
          </div>

          <div className="w-full lg:w-[450px] relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
            <div className="relative glass-panel rounded-[1.8rem] flex items-center p-2">
              <div className="absolute left-6 text-slate-500 group-hover:text-indigo-400 transition-colors">
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder="Query database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white font-medium placeholder-slate-600 py-5 pl-16 pr-6 text-lg focus:ring-0"
              />
            </div>
          </div>
        </section>

        {/* Dynamic Stats Overview */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 overflow-visible">
            <StatsCard label="Total Capacity" value={products.length} icon={Layers} color="indigo" index={0} />
            <StatsCard label="Unique Segments" value={categories.length} icon={PackageSearch} color="purple" index={1} />
            <StatsCard label="Growth Index" value="+12.4%" icon={TrendingUp} color="emerald" index={2} />
            <StatsCard label="Active Nodes" value={products.filter(p => p.stockQuantity > 0).length} icon={Activity} color="fuchsia" index={3} />
          </div>
        )}

        {/* Inventory Flow */}
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-black uppercase tracking-widest text-slate-500 flex items-center gap-3">
            <span className="w-10 h-[2px] bg-slate-800"></span>
            Inventory Stream
          </h3>
          <button
            onClick={() => setShowForm(true)}
            className="sm:hidden p-4 bg-indigo-600 rounded-2xl text-white shadow-xl"
          >
            <Plus size={24} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[320px] glass-panel rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full glass-panel rounded-[3rem] p-20 flex flex-col items-center justify-center text-center animate-fade-in-up shadow-2xl">
            <div className="w-32 h-32 mb-8 rounded-[2.5rem] bg-slate-900 flex items-center justify-center border border-white/5 shadow-inner group">
              <PackageSearch className="text-indigo-500 group-hover:scale-110 transition-transform duration-500" size={56} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Void Detected</h3>
            <p className="text-slate-500 text-lg max-w-sm font-medium mb-10">
              No entities match your current sequence. Initialize a new product to populate the stream.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="group px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-indigo-400 font-bold border border-white/5 transition-all flex items-center gap-3"
              >
                Reset Sequence <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onEdit={(p) => {
                  setEditingProduct(p);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleCreateOrUpdate}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
