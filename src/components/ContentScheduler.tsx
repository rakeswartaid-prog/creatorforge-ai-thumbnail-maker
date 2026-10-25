import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle, Repeat, Send, Share2, AlertCircle, Trash2, Edit2, Play, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

export interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  platforms: ('instagram' | 'youtube' | 'tiktok' | 'twitter' | 'facebook')[];
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:MM
  recurring: 'none' | 'weekly-mon' | 'weekly-thu' | 'daily' | 'bi-weekly';
  status: 'scheduled' | 'published' | 'draft';
  mediaPreview?: string;
}

export const ContentScheduler: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'queue'>('calendar');
  const [showAddModal, setShowAddModal] = useState(false);

  // Initial mock scheduled posts
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: 'post-1',
      title: 'How I Scaled from ₹0 to ₹10 Lakhs (Real Breakdown)',
      caption: 'The complete breakdown of my 1-person business stack in 2026. Stop overcomplicating your tools. #CreatorEconomy #Solopreneur',
      platforms: ['youtube', 'instagram', 'twitter'],
      scheduledDate: '2026-10-26',
      scheduledTime: '18:00',
      recurring: 'weekly-mon',
      status: 'scheduled',
      mediaPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'post-2',
      title: 'Stop using Photoshop for thumbnails in 2026 ❌',
      caption: 'Why mobile glanceability dictates 80% of your channel click-through rate. Drop a comment for the free simulator! 👇',
      platforms: ['instagram', 'tiktok'],
      scheduledDate: '2026-10-28',
      scheduledTime: '12:30',
      recurring: 'weekly-thu',
      status: 'scheduled',
    },
    {
      id: 'post-3',
      title: 'The 3-word rule that doubled our video CTR',
      caption: 'Quick insight on visual hooks: never use more than 4 words on a mobile thumbnail. Full breakdown thread below 🧵',
      platforms: ['twitter', 'facebook'],
      scheduledDate: '2026-10-25',
      scheduledTime: '09:00',
      recurring: 'none',
      status: 'published',
    },
  ]);

  // New post modal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<('instagram' | 'youtube' | 'tiktok' | 'twitter' | 'facebook')[]>(['youtube', 'instagram']);
  const [newDate, setNewDate] = useState('2026-10-27');
  const [newTime, setNewTime] = useState('17:00');
  const [newRecurring, setNewRecurring] = useState<'none' | 'weekly-mon' | 'weekly-thu' | 'daily' | 'bi-weekly'>('none');
  const [simulatingPublish, setSimulatingPublish] = useState<string | null>(null);

  const togglePlatform = (p: 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'facebook') => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((x) => x !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: ScheduledPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      caption: newCaption || 'Check out our latest video update! #CreatorForge',
      platforms: selectedPlatforms,
      scheduledDate: newDate,
      scheduledTime: newTime,
      recurring: newRecurring,
      status: 'scheduled',
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewCaption('');
    setShowAddModal(false);
  };

  const handlePublishNow = (id: string) => {
    setSimulatingPublish(id);
    setTimeout(() => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'published' as const } : p))
      );
      setSimulatingPublish(null);
    }, 1200);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  // Calendar dates for current month (Oct 2026 mockup)
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
    const dayPosts = posts.filter((p) => p.scheduledDate === dateStr);
    return { day, dateStr, dayPosts };
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner and Quick Stats */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-400" />
            Multi-Platform Content Scheduler & Auto-Publishing Queue
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Schedule once to automatically publish across YouTube, Instagram Reels, TikTok, Twitter/X, and Facebook with recurring schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === 'calendar' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('queue')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === 'queue' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Queue List ({posts.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Schedule Content
          </button>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Scheduled in Queue</span>
          <span className="text-xl font-bold text-white font-mono tabular-nums">
            {posts.filter((p) => p.status === 'scheduled').length} Posts
          </span>
        </div>
        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Connected Channels</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="p-1 rounded bg-red-600/20 text-red-400"><Youtube className="w-3.5 h-3.5" /></span>
            <span className="p-1 rounded bg-pink-600/20 text-pink-400"><Instagram className="w-3.5 h-3.5" /></span>
            <span className="p-1 rounded bg-sky-500/20 text-sky-400"><Twitter className="w-3.5 h-3.5" /></span>
            <span className="p-1 rounded bg-blue-600/20 text-blue-400"><Facebook className="w-3.5 h-3.5" /></span>
          </div>
        </div>
        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Scheduled Run</span>
          <span className="text-xs font-semibold text-amber-400 mt-1 block">
            Oct 26, 2026 @ 18:00
          </span>
        </div>
        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Auto-Sync Health</span>
          <span className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> API Connected (100%)
          </span>
        </div>
      </div>

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-display">
              October 2026 Publishing Grid
            </h3>
            <span className="text-xs text-slate-400 font-mono">Timezone: UTC+05:30 (IST) / Global</span>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-1 border-b border-slate-800">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((cd) => (
              <div
                key={cd.day}
                className={`min-h-[90px] p-2 rounded-xl border flex flex-col justify-between transition-colors ${
                  cd.dayPosts.length > 0
                    ? 'bg-slate-900 border-amber-400/40'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold ${
                      cd.day === 24
                        ? 'w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center'
                        : 'text-slate-400'
                    }`}
                  >
                    {cd.day}
                  </span>
                  {cd.dayPosts.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </div>

                {/* Posts on this day */}
                <div className="flex flex-col gap-1 my-1">
                  {cd.dayPosts.map((dp) => (
                    <div
                      key={dp.id}
                      className="p-1 rounded bg-slate-800 border border-slate-700 text-[10px] leading-tight"
                      title={dp.title}
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-mono text-amber-400 font-bold">{dp.scheduledTime}</span>
                        <div className="flex gap-0.5">
                          {dp.platforms.slice(0, 2).map((pl) => (
                            <span key={pl} className="uppercase text-[8px] font-bold text-slate-400">
                              {pl[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-white truncate font-medium">{dp.title}</p>
                    </div>
                  ))}
                </div>

                <div className="text-[9px] text-slate-500 font-mono">
                  {cd.dayPosts.length > 0 ? `${cd.dayPosts.length} scheduled` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUEUE LIST VIEW */}
      {viewMode === 'queue' && (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                        post.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {post.scheduledDate} @ {post.scheduledTime}
                    </span>
                    {post.recurring !== 'none' && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                        <Repeat className="w-3 h-3 text-amber-400" />
                        {post.recurring}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white font-display leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-xl">
                    {post.caption}
                  </p>

                  {/* Platforms */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Posting to:</span>
                    {post.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] uppercase font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {post.status !== 'published' && (
                  <button
                    onClick={() => handlePublishNow(post.id)}
                    disabled={simulatingPublish === post.id}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {simulatingPublish === post.id ? 'Publishing...' : 'Publish Now'}
                  </button>
                )}

                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-1.5 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                  title="Delete scheduled post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCHEDULE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePost}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Schedule New Content
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Post Title / Video Subject</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. My 30-Day Solopreneur Revenue Breakdown"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Social Caption & Hashtags</label>
              <textarea
                rows={3}
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Paste generated caption from Caption Suite or write custom copy..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Target Platforms */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Platforms</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['youtube', 'instagram', 'tiktok', 'twitter'] as const).map((pl) => (
                  <button
                    key={pl}
                    type="button"
                    onClick={() => togglePlatform(pl)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold capitalize transition-colors border cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedPlatforms.includes(pl)
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {pl}
                  </button>
                ))}
              </div>
            </div>

            {/* Date, Time & Recurring */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Recurring</label>
                <select
                  value={newRecurring}
                  onChange={(e) => setNewRecurring(e.target.value as any)}
                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="none">One-time</option>
                  <option value="weekly-mon">Weekly (Mon)</option>
                  <option value="weekly-thu">Weekly (Thu)</option>
                  <option value="daily">Daily Blitz</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
