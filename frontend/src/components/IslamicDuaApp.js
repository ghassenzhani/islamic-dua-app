import React, { useState, useEffect } from 'react';
import { Search, Heart, BookOpen, Sparkles, Trash2, Star, X, LogOut, User, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const allahNames = [
  { id: 1, arabic: "الرَّحْمَن", transliteration: "Ar-Rahman", meaning: "The Most Merciful" },
  { id: 2, arabic: "الرَّحِيم", transliteration: "Ar-Raheem", meaning: "The Most Compassionate" },
  { id: 3, arabic: "الْمَلِك", transliteration: "Al-Malik", meaning: "The King" },
  { id: 4, arabic: "الْقُدُّوس", transliteration: "Al-Quddus", meaning: "The Most Holy" },
  { id: 5, arabic: "السَّلاَم", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { id: 6, arabic: "الْمُؤْمِن", transliteration: "Al-Mu'min", meaning: "The Giver of Faith" },
  { id: 7, arabic: "الْمُهَيْمِن", transliteration: "Al-Muhaymin", meaning: "The Guardian" },
  { id: 8, arabic: "الْعَزِيز", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { id: 9, arabic: "الْجَبَّار", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { id: 10, arabic: "الْمُتَكَبِّر", transliteration: "Al-Mutakabbir", meaning: "The Supreme" },
  { id: 11, arabic: "الْخَالِق", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { id: 12, arabic: "الْبَارِئ", transliteration: "Al-Bari", meaning: "The Evolver" },
  { id: 13, arabic: "الْمُصَوِّر", transliteration: "Al-Musawwir", meaning: "The Fashioner" },
  { id: 14, arabic: "الْغَفَّار", transliteration: "Al-Ghaffar", meaning: "The Oft-Forgiving" },
  { id: 15, arabic: "الْقَهَّار", transliteration: "Al-Qahhar", meaning: "The Subduer" },
  { id: 16, arabic: "الْوَهَّاب", transliteration: "Al-Wahhab", meaning: "The Bestower" },
  { id: 17, arabic: "الرَّزَّاق", transliteration: "Ar-Razzaq", meaning: "The Provider" },
  { id: 18, arabic: "الْفَتَّاح", transliteration: "Al-Fattah", meaning: "The Opener" },
  { id: 19, arabic: "اَلْعَلِيْم", transliteration: "Al-Aleem", meaning: "The All-Knowing" },
  { id: 20, arabic: "الْقَابِض", transliteration: "Al-Qabid", meaning: "The Withholder" },
  { id: 21, arabic: "الْبَاسِط", transliteration: "Al-Basit", meaning: "The Expander" },
  { id: 22, arabic: "الْخَافِض", transliteration: "Al-Khafid", meaning: "The Abaser" },
  { id: 23, arabic: "الرَّافِع", transliteration: "Ar-Rafi", meaning: "The Exalter" },
  { id: 24, arabic: "الْمُعِز", transliteration: "Al-Mu'izz", meaning: "The Giver of Honor" },
  { id: 25, arabic: "المُذِل", transliteration: "Al-Mudhill", meaning: "The Giver of Dishonor" },
  { id: 26, arabic: "السَّمِيع", transliteration: "As-Sami", meaning: "The All-Hearing" },
  { id: 27, arabic: "الْبَصِير", transliteration: "Al-Baseer", meaning: "The All-Seeing" },
  { id: 28, arabic: "الْحَكَم", transliteration: "Al-Hakam", meaning: "The Judge" },
  { id: 29, arabic: "الْعَدْل", transliteration: "Al-Adl", meaning: "The Just" },
  { id: 30, arabic: "اللَّطِيف", transliteration: "Al-Latif", meaning: "The Subtle One" },
  { id: 31, arabic: "الْخَبِير", transliteration: "Al-Khabeer", meaning: "The All-Aware" },
  { id: 32, arabic: "الْحَلِيم", transliteration: "Al-Haleem", meaning: "The Forbearing" },
  { id: 33, arabic: "الْعَظِيم", transliteration: "Al-Azeem", meaning: "The Magnificent" },
  { id: 34, arabic: "الْغَفُور", transliteration: "Al-Ghafoor", meaning: "The Great Forgiver" },
  { id: 35, arabic: "الشَّكُور", transliteration: "Ash-Shakoor", meaning: "The Most Appreciative" },
  { id: 36, arabic: "الْعَلِيّ", transliteration: "Al-Aliyy", meaning: "The Most High" },
  { id: 37, arabic: "الْكَبِير", transliteration: "Al-Kabeer", meaning: "The Most Great" },
  { id: 38, arabic: "الْحَفِيظ", transliteration: "Al-Hafiz", meaning: "The Preserver" },
  { id: 39, arabic: "المُقيِت", transliteration: "Al-Muqeet", meaning: "The Sustainer" },
  { id: 40, arabic: "الْحسِيب", transliteration: "Al-Haseeb", meaning: "The Reckoner" },
  { id: 41, arabic: "الْجَلِيل", transliteration: "Al-Jaleel", meaning: "The Majestic" },
  { id: 42, arabic: "الْكَرِيم", transliteration: "Al-Kareem", meaning: "The Most Generous" },
  { id: 43, arabic: "الرَّقِيب", transliteration: "Ar-Raqeeb", meaning: "The Watchful" },
  { id: 44, arabic: "الْمُجِيب", transliteration: "Al-Mujeeb", meaning: "The Responsive" },
  { id: 45, arabic: "الْوَاسِع", transliteration: "Al-Wasi", meaning: "The All-Encompassing" },
  { id: 46, arabic: "الْحَكِيم", transliteration: "Al-Hakeem", meaning: "The All-Wise" },
  { id: 47, arabic: "الْوَدُود", transliteration: "Al-Wadud", meaning: "The Most Loving" },
  { id: 48, arabic: "الْمَجِيد", transliteration: "Al-Majeed", meaning: "The Glorious" },
  { id: 49, arabic: "الْبَاعِث", transliteration: "Al-Ba'ith", meaning: "The Resurrector" },
  { id: 50, arabic: "الشَّهِيد", transliteration: "Ash-Shaheed", meaning: "The Witness" },
  { id: 51, arabic: "الْحَق", transliteration: "Al-Haqq", meaning: "The Truth" },
  { id: 52, arabic: "الْوَكِيل", transliteration: "Al-Wakeel", meaning: "The Trustee" },
  { id: 53, arabic: "الْقَوِيّ", transliteration: "Al-Qawiyy", meaning: "The Most Strong" },
  { id: 54, arabic: "الْمَتِين", transliteration: "Al-Mateen", meaning: "The Firm" },
  { id: 55, arabic: "الْوَلِيّ", transliteration: "Al-Waliyy", meaning: "The Protecting Friend" },
  { id: 56, arabic: "الْحَمِيد", transliteration: "Al-Hameed", meaning: "The Praiseworthy" },
  { id: 57, arabic: "الْمُحْصِي", transliteration: "Al-Muhsee", meaning: "The Accounter" },
  { id: 58, arabic: "الْمُبْدِئ", transliteration: "Al-Mubdi", meaning: "The Originator" },
  { id: 59, arabic: "الْمُعِيد", transliteration: "Al-Mu'id", meaning: "The Restorer" },
  { id: 60, arabic: "الْمُحْيِي", transliteration: "Al-Muhyi", meaning: "The Giver of Life" },
  { id: 61, arabic: "اَلْمُمِيتُ", transliteration: "Al-Mumeet", meaning: "The Bringer of Death" },
  { id: 62, arabic: "الْحَيّ", transliteration: "Al-Hayy", meaning: "The Ever-Living" },
  { id: 63, arabic: "الْقَيُّوم", transliteration: "Al-Qayyoom", meaning: "The Self-Sustaining" },
  { id: 64, arabic: "الْوَاجِد", transliteration: "Al-Wajid", meaning: "The Finder" },
  { id: 65, arabic: "الْمَاجِد", transliteration: "Al-Majid", meaning: "The Noble" },
  { id: 66, arabic: "الْواحِد", transliteration: "Al-Wahid", meaning: "The Unique" },
  { id: 67, arabic: "اَلاَحَد", transliteration: "Al-Ahad", meaning: "The One" },
  { id: 68, arabic: "الصَّمَد", transliteration: "As-Samad", meaning: "The Eternal" },
  { id: 69, arabic: "الْقَادِر", transliteration: "Al-Qadir", meaning: "The Capable" },
  { id: 70, arabic: "الْمُقْتَدِر", transliteration: "Al-Muqtadir", meaning: "The Omnipotent" },
  { id: 71, arabic: "الْمُقَدِّم", transliteration: "Al-Muqaddim", meaning: "The Expediter" },
  { id: 72, arabic: "الْمُؤَخِّر", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer" },
  { id: 73, arabic: "الأوَّل", transliteration: "Al-Awwal", meaning: "The First" },
  { id: 74, arabic: "الآخِر", transliteration: "Al-Akhir", meaning: "The Last" },
  { id: 75, arabic: "الظَّاهِر", transliteration: "Az-Zahir", meaning: "The Manifest" },
  { id: 76, arabic: "الْبَاطِن", transliteration: "Al-Batin", meaning: "The Hidden" },
  { id: 77, arabic: "الْوَالِي", transliteration: "Al-Wali", meaning: "The Governor" },
  { id: 78, arabic: "الْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "The Self-Exalted" },
  { id: 79, arabic: "الْبَرُّ", transliteration: "Al-Barr", meaning: "The Source of Goodness" },
  { id: 80, arabic: "التَّوَاب", transliteration: "At-Tawwab", meaning: "The Acceptor of Repentance" },
  { id: 81, arabic: "الْمُنْتَقِم", transliteration: "Al-Muntaqim", meaning: "The Avenger" },
  { id: 82, arabic: "العَفُوّ", transliteration: "Al-Afuww", meaning: "The Pardoner" },
  { id: 83, arabic: "الرَّؤُوف", transliteration: "Ar-Ra'uf", meaning: "The Most Kind" },
  { id: 84, arabic: "مَالِكُ الْمُلْك", transliteration: "Malik-ul-Mulk", meaning: "Master of the Kingdom" },
  { id: 85, arabic: "ذُوالْجَلاَلِ وَالإكْرَام", transliteration: "Dhul-Jalali Wal-Ikram", meaning: "Lord of Majesty" },
  { id: 86, arabic: "الْمُقْسِط", transliteration: "Al-Muqsit", meaning: "The Equitable" },
  { id: 87, arabic: "الْجَامِع", transliteration: "Al-Jami", meaning: "The Gatherer" },
  { id: 88, arabic: "الْغَنِيّ", transliteration: "Al-Ghaniyy", meaning: "The Self-Sufficient" },
  { id: 89, arabic: "الْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher" },
  { id: 90, arabic: "اَلْمَانِعُ", transliteration: "Al-Mani", meaning: "The Preventer" },
  { id: 91, arabic: "الضَّارَّ", transliteration: "Ad-Darr", meaning: "The Distresser" },
  { id: 92, arabic: "النَّافِع", transliteration: "An-Nafi", meaning: "The Benefiter" },
  { id: 93, arabic: "النُّور", transliteration: "An-Nur", meaning: "The Light" },
  { id: 94, arabic: "الْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide" },
  { id: 95, arabic: "الْبَدِيع", transliteration: "Al-Badi", meaning: "The Incomparable" },
  { id: 96, arabic: "اَلْبَاقِي", transliteration: "Al-Baqi", meaning: "The Ever-Surviving" },
  { id: 97, arabic: "الْوَارِث", transliteration: "Al-Warith", meaning: "The Inheritor" },
  { id: 98, arabic: "الرَّشِيد", transliteration: "Ar-Rasheed", meaning: "The Guide to Right" },
  { id: 99, arabic: "الصَّبُور", transliteration: "As-Sabur", meaning: "The Patient" }
];

export default function IslamicDuaApp() {
  const { user, logout, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [personalDua, setPersonalDua] = useState('');
  const [savedDuas, setSavedDuas] = useState([]);
  const [favoriteNames, setFavoriteNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomDua, setRandomDua] = useState('');
  const [randomLoading, setRandomLoading] = useState(false);
  const [duaError, setDuaError] = useState('');
  const [newNameDua, setNewNameDua] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Apply theme class to the root html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load data on component mount - from user (if logged in) or localStorage (if guest)
  useEffect(() => {
    if (user) {
      // User is logged in - load from server
      setSavedDuas(user.savedDuas || []);
      setFavoriteNames(user.favoriteNames || []);
    } else {
      // Guest mode - load from localStorage
      const guestDuas = localStorage.getItem('guest_duas');
      const guestFavorites = localStorage.getItem('guest_favorites');
      if (guestDuas) {
        try {
          setSavedDuas(JSON.parse(guestDuas));
        } catch (e) {
          console.error('Error parsing guest duas:', e);
        }
      }
      if (guestFavorites) {
        try {
          setFavoriteNames(JSON.parse(guestFavorites));
        } catch (e) {
          console.error('Error parsing guest favorites:', e);
        }
      }
    }
  }, [user]);

  const filteredNames = allahNames.filter(name =>
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.arabic.includes(searchTerm) ||
    name.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchRandomDua = async (nameId) => {
    setRandomLoading(true);
    setDuaError('');
    try {
      const response = await axios.get(`/api/duas/name/${nameId}/random`);
      setRandomDua(response.data.dua.text);
    } catch (error) {
      console.error('Error fetching random dua:', error);
      setRandomDua('');
      setDuaError('لا يوجد دعاء مخزن لهذا الاسم حالياً');
    } finally {
      setRandomLoading(false);
    }
  };

  const handleSavePersonalDua = async () => {
    if (personalDua.trim()) {
      setLoading(true);
      try {
        if (user) {
          // User is logged in - save to server
          const response = await axios.post('/api/duas/save', {
            text: personalDua.trim(),
          });
          setSavedDuas(response.data.savedDuas);
          await fetchUser(); // Refresh user data
        } else {
          // Guest mode - save to localStorage
          const newDua = {
            _id: Date.now().toString(),
            text: personalDua.trim(),
            date: new Date().toISOString(),
          };
          const updatedDuas = [...savedDuas, newDua];
          setSavedDuas(updatedDuas);
          localStorage.setItem('guest_duas', JSON.stringify(updatedDuas));
        }
        setPersonalDua('');
        alert('تم حفظ دعائك! اللهم آمين');
      } catch (error) {
        console.error('Error saving dua:', error);
        alert('حدث خطأ أثناء حفظ الدعاء');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteDua = async (duaId) => {
    setLoading(true);
    try {
      if (user) {
        // User is logged in - delete from server
        const response = await axios.delete(`/api/duas/${duaId}`);
        setSavedDuas(response.data.savedDuas);
        await fetchUser(); // Refresh user data
      } else {
        // Guest mode - delete from localStorage
        const updatedDuas = savedDuas.filter((dua) => dua._id !== duaId);
        setSavedDuas(updatedDuas);
        localStorage.setItem('guest_duas', JSON.stringify(updatedDuas));
      }
    } catch (error) {
      console.error('Error deleting dua:', error);
      alert('حدث خطأ أثناء حذف الدعاء');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNameDua = async () => {
    if (!selectedName) return;
    if (!user) {
      alert('يجب تسجيل الدخول لإضافة دعاء');
      return;
    }
    if (!newNameDua.trim()) return;

    setRandomLoading(true);
    try {
      await axios.post('/api/duas/name', {
        nameId: selectedName.id,
        text: newNameDua.trim(),
      });
      setNewNameDua('');
      await fetchRandomDua(selectedName.id);
      alert('تمت إضافة الدعاء وحفظه في قاعدة البيانات');
    } catch (error) {
      console.error('Error adding name dua:', error);
      alert('حدث خطأ أثناء إضافة الدعاء');
    } finally {
      setRandomLoading(false);
    }
  };

  const toggleFavorite = async (nameId) => {
    setLoading(true);
    try {
      if (user) {
        // User is logged in - save to server
        const response = await axios.post('/api/duas/favorite', { nameId });
        setFavoriteNames(response.data.favoriteNames);
        await fetchUser(); // Refresh user data
      } else {
        // Guest mode - save to localStorage
        let updatedFavorites;
        if (favoriteNames.includes(nameId)) {
          updatedFavorites = favoriteNames.filter(id => id !== nameId);
        } else {
          updatedFavorites = [...favoriteNames, nameId];
        }
        setFavoriteNames(updatedFavorites);
        localStorage.setItem('guest_favorites', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('حدث خطأ أثناء تحديث المفضلة');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    // Clear guest data when logging out
    localStorage.removeItem('guest_duas');
    localStorage.removeItem('guest_favorites');
    setSavedDuas([]);
    setFavoriteNames([]);
    setRandomDua('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8" />
                أسماء الله الحسنى
              </h1>
              <p className="text-xl text-emerald-100">The 99 Beautiful Names of Allah</p>
              <p className="text-sm text-emerald-200 mt-2 italic">
                ولله الأسماء الحسنى فادعوه بها - سورة الأعراف 180
              </p>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                    <User className="w-5 h-5" />
                    <span className="font-semibold">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    title="تسجيل الخروج"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>خروج</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    title="تسجيل الدخول"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>تسجيل الدخول</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white/30 hover:bg-white/40 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    title="إنشاء حساب"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>إنشاء حساب</span>
                  </Link>
                  <div className="text-sm text-emerald-100 px-3 py-2 bg-white/10 rounded-lg">
                    وضع الضيف
                  </div>
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!user && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4" dir="rtl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <div>
                <p className="font-semibold text-gray-800">أنت تستخدم وضع الضيف</p>
                <p className="text-sm text-gray-600">يمكنك استخدام التطبيق بدون حساب. للاحتفاظ ببياناتك على جميع الأجهزة، <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">أنشئ حساباً</Link> أو <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">سجل الدخول</Link></p>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-slate-900/80 dark:text-slate-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4 dark:text-slate-100">
            <Heart className="w-6 h-6 text-rose-500" />
            اكتب دعاءك الخاص
          </h2>
          <div className="space-y-4">
            <textarea
              value={personalDua}
              onChange={(e) => setPersonalDua(e.target.value)}
              placeholder="اكتب دعاءك هنا... اللهم استجب دعاءنا وارزقنا خير الدنيا والآخرة"
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none text-lg dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
              dir="rtl"
              disabled={loading}
            />
            <button
              onClick={handleSavePersonalDua}
              disabled={loading || !personalDua.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ الدعاء'}
            </button>
            {savedDuas.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3 dark:text-slate-100">أدعيتك المحفوظة:</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {savedDuas.map((dua, index) => (
                    <div key={dua._id || index} className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2 dark:text-slate-100" dir="rtl">{dua.text}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          {new Date(dua.date).toLocaleString('ar-SA')}
                          {!user && <span className="ml-2 text-emerald-600">(محفوظ محلياً)</span>}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteDua(dua._id)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
                        title="حذف الدعاء"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو المعنى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none text-lg shadow-sm"
              dir="rtl"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-slate-900/80 dark:text-slate-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 dark:text-slate-100">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            الأسماء الحسنى التسعة والتسعون
          </h2>

          {favoriteNames.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2 dark:text-slate-100">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                المفضلة
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3 pb-4 border-b-2 border-gray-200 mb-4">
                {allahNames.filter(name => favoriteNames.includes(name.id)).map((name) => (
                  <button
                    key={name.id}
                    onClick={() => setSelectedName(name)}
                    disabled={loading}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 text-center hover:shadow-md relative disabled:opacity-50 ${
                      selectedName?.id === name.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-md transform scale-105'
                        : 'border-amber-200 bg-amber-50 hover:border-amber-300'
                    }`}
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 absolute top-1 right-1" />
                    <div className="text-xl font-arabic text-emerald-700 mb-1">{name.arabic}</div>
                    <div className="font-semibold text-gray-800 text-xs">{name.transliteration}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {filteredNames.map((name) => (
              <div key={name.id} className="relative group">
                <button
                  onClick={() => {
                    setSelectedName(name);
                    fetchRandomDua(name.id);
                  }}
                  disabled={loading}
                  className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-center hover:shadow-md disabled:opacity-50 ${
                    selectedName?.id === name.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-xl font-arabic text-emerald-700 mb-1">{name.arabic}</div>
                  <div className="font-semibold text-gray-800 text-xs">{name.transliteration}</div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(name.id);
                  }}
                  disabled={loading}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title={favoriteNames.includes(name.id) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                >
                  <Star className={`w-4 h-4 ${favoriteNames.includes(name.id) ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedName && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedName(null)}>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white max-w-2xl w-full relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedName(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="text-6xl font-arabic mb-4">{selectedName.arabic}</div>
                <div className="text-3xl font-bold mb-2">{selectedName.transliteration}</div>
                <div className="text-xl text-emerald-100 italic">{selectedName.meaning}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-6 space-y-4">
                <h3 className="font-semibold text-xl flex items-center gap-2 justify-center">
                  <Heart className="w-6 h-6" />
                  الدعاء بهذا الاسم
                </h3>

                {duaError && (
                  <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm" dir="rtl">
                    {duaError}
                  </div>
                )}

                <div className="bg-white/20 rounded-xl p-4 min-h-[100px] flex items-center justify-center text-center">
                  {randomLoading ? (
                    <span className="text-emerald-100">جاري جلب دعاء عشوائي...</span>
                  ) : randomDua ? (
                    <p className="text-lg leading-relaxed text-emerald-50" dir="rtl">{randomDua}</p>
                  ) : (
                    <p className="text-emerald-50" dir="rtl">لا يوجد دعاء متاح حالياً لهذا الاسم</p>
                  )}
                </div>

                {user ? (
                  <div className="bg-white/10 rounded-xl p-4 space-y-3">
                    <p className="text-sm text-emerald-50" dir="rtl">أضف دعاءك المرتبط بهذا الاسم وسيتم تخزينه في قاعدة البيانات</p>
                    <textarea
                      value={newNameDua}
                      onChange={(e) => setNewNameDua(e.target.value)}
                      placeholder="اكتب دعاء لهذا الاسم"
                      className="w-full p-3 rounded-lg border border-emerald-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      dir="rtl"
                      rows={3}
                      disabled={randomLoading}
                    />
                    <button
                      onClick={handleAddNameDua}
                      disabled={randomLoading || !newNameDua.trim()}
                      className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                    >
                      إضافة الدعاء
                    </button>
                  </div>
                ) : (
                  <div className="bg-white/10 rounded-xl p-4 text-center text-emerald-50">
                    قم بتسجيل الدخول لإضافة أدعية جديدة
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!selectedName && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
            <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <p className="text-lg text-gray-700">
              اختر أحد أسماء الله الحسنى لترى الدعاء المرتبط به
            </p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="mb-1">اللهم تقبل دعاءنا وارحمنا برحمتك</p>
          <p className="text-sm text-gray-400">
            إن ربي قريب مجيب - سورة هود 61
          </p>
          <p className="text-xs text-gray-500 mt-3">
            © {new Date().getFullYear()} Ghassen Zhani. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

