import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { X, Sparkles } from 'lucide-react';

interface ProductFormProps {
    product?: Product;
    onSubmit: (product: Product) => void;
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose }) => {
    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        category: '',
        stockQuantity: 0,
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stockQuantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="glass-card w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02] backdrop-blur-3xl">
                    <div>
                        <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
                            <Sparkles className="text-primary" size={28} />
                            {product ? 'EDIT' : 'NEW'} <span className="text-primary">NODE</span>
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 mt-1">Inventory Orchestration</p>
                    </div>
                    <button onClick={onClose} className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Identification</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium placeholder:text-slate-700"
                            placeholder="Product Title..."
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Specifications</label>
                        <textarea
                            name="description"
                            rows={3}
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium resize-none placeholder:text-slate-700"
                            placeholder="System description..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Market Value ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-background/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Node Count</label>
                            <input
                                type="number"
                                name="stockQuantity"
                                required
                                min="0"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                className="w-full bg-background/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-bold"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Classification</label>
                        <input
                            type="text"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium placeholder:text-slate-700"
                            placeholder="Category segment..."
                        />
                    </div>
                    <div className="pt-8 flex gap-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all font-bold border border-white/5"
                        >
                            ABORT
                        </button>
                        <button
                            type="submit"
                            className="flex-2 px-10 py-4 bg-primary text-white rounded-2xl transition-all font-black shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] tracking-widest uppercase text-sm"
                        >
                            {product ? 'SYCN HIERARCHY' : 'INITIALIZE NODE'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default ProductForm;
