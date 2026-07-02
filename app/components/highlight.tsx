'use client'

import { Highlight } from '@/lib/parseHome'
import { motion } from 'framer-motion'

export default function HighlightBlock({ data }: { data: Highlight }) {
  return (
    <section
      className={`flex flex-col sm:flex-row items-center justify-center gap-8 min-h-screen sm:h-screen px-6 sm:px-16 pt-20 snap-start snap-always ${
        data.side === 'left' ? 'sm:flex-row-reverse' : 'sm:flex-row'
      }`}
    >
      <motion.div
        className="w-full sm:w-1/2 max-h-[45vh] sm:max-h-none"
        initial={{ opacity: 0, x: data.side === 'left' ? -60 : 60 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {data.mediaType === 'video' ? (
          <video
            src={data.media}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[45vh] sm:max-h-none object-cover rounded-lg"
          />
        ) : (
          <img src={data.media} alt="" className="w-full max-h-[45vh] sm:max-h-none object-cover rounded-lg" />
        )}
      </motion.div>

      <motion.div
        className="w-full sm:w-1/2 text-center sm:text-left"
        initial={{ opacity: 0, x: data.side === 'left' ? 60 : -60 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: 'easeOut', delay: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="text-base sm:text-lg">{data.content}</p>
      </motion.div>
    </section>
  )
}