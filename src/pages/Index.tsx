import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const albums = [
    {
      id: 1,
      title: 'Винтажные Мелодии',
      year: '2024',
      cover: 'https://cdn.poehali.dev/projects/12e21841-cfbf-49e3-a173-6286147f8f86/files/6d9e07d8-e324-4e0f-97ce-7c74e3d2f375.jpg',
      tracks: [
        { id: 1, title: 'Летний Вечер', duration: '3:45' },
        { id: 2, title: 'Ностальгия', duration: '4:12' },
        { id: 3, title: 'Под Звёздами', duration: '3:58' },
      ]
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Концерт в Старом Театре',
      thumbnail: 'https://cdn.poehali.dev/projects/12e21841-cfbf-49e3-a173-6286147f8f86/files/44130623-02e3-4e72-8b6f-2401ddc4ca1b.jpg',
      duration: '5:30'
    }
  ];

  const lyrics = [
    {
      id: 1,
      title: 'Летний Вечер',
      text: 'Текст песни будет здесь...\nСтрока за строкой...'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-serif text-primary">🎵 Музыкальный Архив</h1>
            <div className="flex gap-6">
              {['home', 'albums', 'videos', 'lyrics', 'info', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === section ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'albums' && 'Альбомы'}
                  {section === 'videos' && 'Видео'}
                  {section === 'lyrics' && 'Тексты'}
                  {section === 'info' && 'Информация'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <section className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-5xl font-serif font-bold mb-6 text-primary">
                  Авторская Музыка
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Добро пожаловать в мой музыкальный архив. Здесь собраны авторские композиции, 
                  записанные с душой и вдохновением. Каждая песня — это история, воспоминание, 
                  момент жизни, застывший в звуке.
                </p>
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => setActiveSection('albums')}
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Слушать Альбомы
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setActiveSection('videos')}
                  >
                    <Icon name="Video" size={20} className="mr-2" />
                    Смотреть Видео
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://cdn.poehali.dev/projects/12e21841-cfbf-49e3-a173-6286147f8f86/files/4f0dbebb-fefc-45dd-bfcb-b82bfcf2019c.jpg"
                  alt="Винтажный проигрыватель"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-8 border-primary/20 animate-spin-slow"></div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Icon name="Disc3" size={40} className="mb-4 text-accent" />
                <h3 className="text-xl font-serif font-semibold mb-2">Альбомы</h3>
                <p className="text-muted-foreground">Коллекция авторских композиций</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Icon name="Video" size={40} className="mb-4 text-accent" />
                <h3 className="text-xl font-serif font-semibold mb-2">Видео</h3>
                <p className="text-muted-foreground">Концерты и клипы</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Icon name="FileText" size={40} className="mb-4 text-accent" />
                <h3 className="text-xl font-serif font-semibold mb-2">Тексты</h3>
                <p className="text-muted-foreground">Слова и смыслы песен</p>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'albums' && (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-primary">Альбомы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <Card key={album.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={album.cover} alt={album.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-semibold mb-2">{album.title}</h3>
                    <p className="text-muted-foreground mb-4">{album.year}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Icon name="ListMusic" size={18} className="mr-2" />
                          Треклист
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-serif text-2xl">{album.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          {album.tracks.map((track) => (
                            <div
                              key={track.id}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                              onClick={() => {
                                setCurrentTrack(track.id);
                                setIsPlaying(!isPlaying);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <Icon 
                                  name={currentTrack === track.id && isPlaying ? "Pause" : "Play"} 
                                  size={20} 
                                  className="text-accent"
                                />
                                <span>{track.title}</span>
                              </div>
                              <span className="text-muted-foreground text-sm">{track.duration}</span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'videos' && (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-primary">Видео</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer">
                      <Icon name="Play" size={48} className="text-white" />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold">{video.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'lyrics' && (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-primary">Тексты Песен</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {lyrics.map((lyric) => (
                <Card key={lyric.id} className="p-8">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-accent">{lyric.title}</h3>
                  <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-muted-foreground">
                    {lyric.text}
                  </pre>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'info' && (
          <section className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-primary">Важная Информация</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-accent">
                    <Icon name="Shield" size={24} className="inline mr-2" />
                    Авторские Права
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Все композиции и тексты песен являются авторскими произведениями и защищены законом 
                    об авторском праве. Любое использование материалов возможно только с письменного разрешения автора.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-accent">
                    <Icon name="Info" size={24} className="inline mr-2" />
                    О Проекте
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Этот музыкальный архив создан для сохранения и популяризации авторской музыки. 
                    Здесь вы найдёте композиции разных жанров, объединённые искренностью и душевностью исполнения.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-primary">Контакты</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">music@example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MessageCircle" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Социальные сети</h3>
                    <div className="flex gap-3 mt-2">
                      <Button size="sm" variant="outline">VK</Button>
                      <Button size="sm" variant="outline">Telegram</Button>
                      <Button size="sm" variant="outline">YouTube</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}
      </main>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-2xl bg-accent hover:bg-accent/90"
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">ИИ Помощник 🤖</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                Здравствуйте! Я виртуальный помощник этого сайта. Чем могу помочь?
              </p>
            </div>
            <Tabs defaultValue="faq">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="faq">Вопросы</TabsTrigger>
                <TabsTrigger value="help">Помощь</TabsTrigger>
              </TabsList>
              <TabsContent value="faq" className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                  Как скачать музыку?
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                  Как связаться с автором?
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                  Где найти тексты песен?
                </Button>
              </TabsContent>
              <TabsContent value="help" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Выберите раздел для получения помощи:
                </p>
                <Button variant="outline" className="w-full">Навигация по сайту</Button>
                <Button variant="outline" className="w-full">Проблемы с воспроизведением</Button>
                <Button variant="outline" className="w-full">Техническая поддержка</Button>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-card border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Музыкальный Архив. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
