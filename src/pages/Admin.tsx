import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/e26cfa69-8e9c-475f-bc37-d28e15db3d30';

const Admin = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [albumForm, setAlbumForm] = useState({
    title: '',
    year: '',
    cover_url: ''
  });

  const [trackForm, setTrackForm] = useState({
    album_id: '',
    title: '',
    audio_url: '',
    duration: ''
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    video_url: '',
    thumbnail_url: '',
    duration: ''
  });

  const [lyricForm, setLyricForm] = useState({
    title: '',
    text: ''
  });

  const handleAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=album`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(albumForm)
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: '✅ Альбом добавлен!', description: `ID: ${data.id}` });
        setAlbumForm({ title: '', year: '', cover_url: '' });
      }
    } catch (error) {
      toast({ title: '❌ Ошибка', description: 'Не удалось добавить альбом', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackForm)
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: '✅ Трек добавлен!', description: `ID: ${data.id}` });
        setTrackForm({ album_id: '', title: '', audio_url: '', duration: '' });
      }
    } catch (error) {
      toast({ title: '❌ Ошибка', description: 'Не удалось добавить трек', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoForm)
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: '✅ Видео добавлено!', description: `ID: ${data.id}` });
        setVideoForm({ title: '', video_url: '', thumbnail_url: '', duration: '' });
      }
    } catch (error) {
      toast({ title: '❌ Ошибка', description: 'Не удалось добавить видео', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleLyricSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=lyric`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lyricForm)
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: '✅ Текст добавлен!', description: `ID: ${data.id}` });
        setLyricForm({ title: '', text: '' });
      }
    } catch (error) {
      toast({ title: '❌ Ошибка', description: 'Не удалось добавить текст', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-serif text-primary">
              <Icon name="Settings" size={24} className="inline mr-2" />
              Админка
            </h1>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="albums" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="albums">Альбомы</TabsTrigger>
            <TabsTrigger value="tracks">Треки</TabsTrigger>
            <TabsTrigger value="videos">Видео</TabsTrigger>
            <TabsTrigger value="lyrics">Тексты</TabsTrigger>
          </TabsList>

          <TabsContent value="albums">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Добавить альбом</h2>
              <form onSubmit={handleAlbumSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="album-title">Название альбома *</Label>
                  <Input
                    id="album-title"
                    value={albumForm.title}
                    onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                    required
                    placeholder="Моя первая пластинка"
                  />
                </div>
                <div>
                  <Label htmlFor="album-year">Год выпуска</Label>
                  <Input
                    id="album-year"
                    value={albumForm.year}
                    onChange={(e) => setAlbumForm({ ...albumForm, year: e.target.value })}
                    placeholder="2024"
                    maxLength={4}
                  />
                </div>
                <div>
                  <Label htmlFor="album-cover">Обложка (URL)</Label>
                  <Input
                    id="album-cover"
                    type="url"
                    value={albumForm.cover_url}
                    onChange={(e) => setAlbumForm({ ...albumForm, cover_url: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Загрузите изображение в облако и вставьте ссылку
                  </p>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Добавление...' : 'Добавить альбом'}
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="tracks">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Добавить трек</h2>
              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="track-album">ID альбома *</Label>
                  <Input
                    id="track-album"
                    type="number"
                    value={trackForm.album_id}
                    onChange={(e) => setTrackForm({ ...trackForm, album_id: e.target.value })}
                    required
                    placeholder="1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Сначала создайте альбом, затем добавьте треки
                  </p>
                </div>
                <div>
                  <Label htmlFor="track-title">Название трека *</Label>
                  <Input
                    id="track-title"
                    value={trackForm.title}
                    onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                    required
                    placeholder="Летний вечер"
                  />
                </div>
                <div>
                  <Label htmlFor="track-audio">Аудио файл (URL) *</Label>
                  <Input
                    id="track-audio"
                    type="url"
                    value={trackForm.audio_url}
                    onChange={(e) => setTrackForm({ ...trackForm, audio_url: e.target.value })}
                    required
                    placeholder="https://example.com/song.mp3"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Загрузите аудио в облако (любой размер) и вставьте ссылку
                  </p>
                </div>
                <div>
                  <Label htmlFor="track-duration">Длительность</Label>
                  <Input
                    id="track-duration"
                    value={trackForm.duration}
                    onChange={(e) => setTrackForm({ ...trackForm, duration: e.target.value })}
                    placeholder="3:45"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Добавление...' : 'Добавить трек'}
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Добавить видео</h2>
              <form onSubmit={handleVideoSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Название видео *</Label>
                  <Input
                    id="video-title"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    required
                    placeholder="Концерт в театре"
                  />
                </div>
                <div>
                  <Label htmlFor="video-url">Видео файл (URL) *</Label>
                  <Input
                    id="video-url"
                    type="url"
                    value={videoForm.video_url}
                    onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                    required
                    placeholder="https://example.com/video.mp4"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Загрузите видео в облако (любой размер) и вставьте ссылку
                  </p>
                </div>
                <div>
                  <Label htmlFor="video-thumb">Превью (URL)</Label>
                  <Input
                    id="video-thumb"
                    type="url"
                    value={videoForm.thumbnail_url}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnail_url: e.target.value })}
                    placeholder="https://example.com/thumb.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="video-duration">Длительность</Label>
                  <Input
                    id="video-duration"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="5:30"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Добавление...' : 'Добавить видео'}
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="lyrics">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Добавить текст песни</h2>
              <form onSubmit={handleLyricSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="lyric-title">Название песни *</Label>
                  <Input
                    id="lyric-title"
                    value={lyricForm.title}
                    onChange={(e) => setLyricForm({ ...lyricForm, title: e.target.value })}
                    required
                    placeholder="Летний вечер"
                  />
                </div>
                <div>
                  <Label htmlFor="lyric-text">Текст песни *</Label>
                  <Textarea
                    id="lyric-text"
                    value={lyricForm.text}
                    onChange={(e) => setLyricForm({ ...lyricForm, text: e.target.value })}
                    required
                    placeholder="Куплет 1&#10;Строка за строкой...&#10;&#10;Припев&#10;..."
                    rows={12}
                    className="font-sans"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Добавление...' : 'Добавить текст'}
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="max-w-3xl mx-auto mt-8 p-6 bg-muted">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Icon name="Info" size={20} />
            Как загружать файлы большого размера
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Загрузите аудио/видео в облачное хранилище (Google Drive, Яндекс.Диск, Dropbox)</li>
            <li>• Получите прямую ссылку на файл (убедитесь, что доступ открыт)</li>
            <li>• Вставьте ссылку в форму выше</li>
            <li>• Для обложек и превью используйте изображения (JPG, PNG)</li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
