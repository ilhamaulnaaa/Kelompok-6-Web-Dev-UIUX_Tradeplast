'use client';

import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  variableSpeedEnabled = false,
  variableSpeedMin = 40,
  variableSpeedMax = 120,
  onSentenceComplete,
  startOnVisible = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [charCount, setCharCount] = useState(0); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // 1. Parsing teks menjadi segmen objek (Clean dari [[ ]])
const currentSegments = useMemo(() => {
    // Tambahkan || "" untuk memastikan rawText selalu berupa string
    const rawText = textArray[currentTextIndex] || ""; 
    
    const parts = rawText.split(/(\[\[.*?\]\])/g);
    return parts.map(part => {
      if (part && part.startsWith('[[') && part.endsWith(']]')) {
        return { value: part.slice(2, -2), isHighlighted: true };
      }
      return { value: part || "", isHighlighted: false };
    });
  }, [textArray, currentTextIndex]);

  // Total panjang karakter tanpa tanda kurung siku
  const fullCleanLength = useMemo(() => 
    currentSegments.reduce((acc, seg) => acc + seg.value.length, 0), 
  [currentSegments]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeedEnabled) return typingSpeed;
    return Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin;
  }, [variableSpeedEnabled, variableSpeedMin, variableSpeedMax, typingSpeed]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 0, duration: cursorBlinkDuration, repeat: -1, yoyo: true, ease: 'power2.inOut' });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;
    let timeout: ReturnType<typeof setTimeout>;

    const executeAnimation = () => {
      if (isDeleting) {
        if (charCount > 0) {
          timeout = setTimeout(() => setCharCount(prev => prev - 1), deletingSpeed);
        } else {
          setIsDeleting(false);
          if (onSentenceComplete) onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
        }
      } else {
        if (charCount < fullCleanLength) {
          timeout = setTimeout(() => setCharCount(prev => prev + 1), variableSpeedEnabled ? getRandomSpeed() : typingSpeed);
        } else {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    timeout = setTimeout(executeAnimation, charCount === 0 && !isDeleting ? initialDelay : 0);
    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, isVisible, fullCleanLength, loop, initialDelay, pauseDuration, typingSpeed, deletingSpeed, variableSpeedEnabled, getRandomSpeed, currentTextIndex, textArray, onSentenceComplete]);

  // 2. Fungsi render yang membagi charCount ke tiap segmen
  const renderStyledContent = () => {
    let charsLeft = charCount;
    return currentSegments.map((seg, i) => {
      if (charsLeft <= 0) return null;
      const displayPart = seg.value.slice(0, charsLeft);
      charsLeft -= seg.value.length;

      return (
        <span key={i} className={seg.isHighlighted ? "text-emerald-600 font-bold" : ""}>
          {displayPart}
        </span>
      );
    });
  };

  const shouldHideCursor = hideCursorWhileTyping && (charCount < fullCleanLength || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <span className="inline">{renderStyledContent()}</span>,
    showCursor && (
      <span ref={cursorRef} className={`ml-1 inline-block ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}>
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;