import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
    index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, index }) => {
    return (
        <div
            className="group glass-card rounded-[2.5rem] p-7 relative overflow-hidden flex flex-col h-full animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Dynamic background blur on hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="px-4 py-1.5 bg-white/5 text-indigo-300 text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/5 backdrop-blur-md">
                    {product.category}
                </span>
                <div className="flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                        onClick={() => onEdit(product)}
                        className="p-2.5 bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 rounded-full transition-all border border-transparent hover:border-indigo-500/20"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => product.id && onDelete(product.id)}
                        className="p-2.5 bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-full transition-all border border-transparent hover:border-rose-500/20"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-grow z-10">
                <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-indigo-200 transition-colors duration-300">
                    {product.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-8 font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                    "{product.description}"
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 items-end border-t border-white/5 pt-6 mt-auto z-10">
                <div>
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1.5">MSRP</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">
                        <span className="text-lg text-indigo-400 font-medium mr-0.5">$</span>
                        {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="text-right flex flex-col items-end">
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Inventory</p>
                    <div className={`px-4 py-1.5 rounded-2xl text-[11px] font-bold inline-flex items-center gap-2
            ${product.stockQuantity < 10
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}
                    >
                        <div className={`w-2 h-2 rounded-full ${product.stockQuantity < 10 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                        {product.stockQuantity} Units
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
