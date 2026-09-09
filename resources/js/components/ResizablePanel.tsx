import { motion } from 'motion/react'
import React from 'react'
import useMeasure from 'react-use-measure';

const ResizablePanel = ({ children }: { children: React.ReactNode }) => {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div className='relative w-full overflow-hidden hover:shadow-2xl hover:shadow-primary-300/50 z-10 rounded-3xl transition-shadow duration-300' animate={{ height }}>
      <div ref={ref} className='group hover:absolute flex flex-col space-y-3 items-center text-center overflow-hidden hover:h-auto h-[260px] cursor-pointer bg-white border border-gray-300/30 rounded-3xl py-8 px-7'>
        {children}
      </div>
    </motion.div>
  )
}

export default ResizablePanel