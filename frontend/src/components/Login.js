import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      // Sync guest data if any exists
      const guestDuas = localStorage.getItem('guest_duas');
      const guestFavorites = localStorage.getItem('guest_favorites');
      
      if (guestDuas || guestFavorites) {
        try {
          // Import guest duas to account
          if (guestDuas) {
            const duas = JSON.parse(guestDuas);
            for (const dua of duas) {
              try {
                await axios.post('/api/duas/save', { text: dua.text });
              } catch (e) {
                console.error('Error syncing dua:', e);
              }
            }
          }
          
          // Import guest favorites to account
          if (guestFavorites) {
            const favorites = JSON.parse(guestFavorites);
            for (const favId of favorites) {
              try {
                await axios.post('/api/duas/favorite', { nameId: favId });
              } catch (e) {
                console.error('Error syncing favorite:', e);
              }
            }
          }
          
          // Clear guest data after syncing
          localStorage.removeItem('guest_duas');
          localStorage.removeItem('guest_favorites');
        } catch (e) {
          console.error('Error syncing guest data:', e);
        }
      }
      
      navigate('/');
    } else {
      setError(result.message || 'فشل تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
          <p className="text-gray-600">مرحباً بك مرة أخرى</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" dir="rtl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" dir="rtl">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                placeholder="أدخل البريد الإلكتروني"
                dir="rtl"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" dir="rtl">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                placeholder="أدخل كلمة المرور"
                dir="rtl"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>جاري تسجيل الدخول...</span>
              </>
            ) : (
              <>
                <span>تسجيل الدخول</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600" dir="rtl">
            ليس لديك حساب؟{' '}
            <Link
              to="/register"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

