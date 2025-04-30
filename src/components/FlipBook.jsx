import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

const pages = [
  {
    type: 'image',
    content: '/images/page1.jpg',
    password: 'page2pass',
  },
  {
    type: 'video',
    content: '/videos/page2.mp4',
    password: 'finalpage',
  },
  {
    type: 'image',
    content: '/images/page3.jpg',
    password: null,
  },
];

export default function FlipBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputPassword, setInputPassword] = useState('');
  const [unlockedPages, setUnlockedPages] = useState([0]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (!unlockedPages.includes(nextPage)) return;
    setCurrentPage(nextPage);
    setInputPassword('');
  };

  const handlePrev = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
    setInputPassword('');
  };

  const handleUnlock = () => {
    if (pages[currentPage].password && inputPassword === pages[currentPage].password) {
      setUnlockedPages([...unlockedPages, currentPage + 1]);
    }
  };

  const renderContent = (page) => {
    if (page.type === 'image') {
      return <img src={page.content} alt="Page content" className="w-full rounded-2xl shadow-xl" />;
    }
    if (page.type === 'video') {
      return <video src={page.content} controls className="w-full rounded-2xl shadow-xl" />;
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <motion.div
        className="w-full max-w-4xl flex items-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <Button onClick={handlePrev} disabled={currentPage === 0} className="mr-2">
          <ArrowLeft />
        </Button>

        <Card className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <CardContent className="space-y-4">
            {renderContent(pages[currentPage])}
            {pages[currentPage].password && !unlockedPages.includes(currentPage + 1) && (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Input
                  placeholder="Enter password to unlock next page"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <Button onClick={handleUnlock}>Unlock</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={handleNext}
          disabled={currentPage >= pages.length - 1 || !unlockedPages.includes(currentPage + 1)}
          className="ml-2"
        >
          <ArrowRight />
        </Button>
      </motion.div>
    </div>
  );
}