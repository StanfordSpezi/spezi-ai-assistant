import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <Image src="/images/spaceman.png" alt="Spaceman" width={100} height={100} />
        </p>
        <p>
          This is an AI assistant designed to help you build digital health applications with the{' '}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/StanfordSpezi/Spezi"
            target="_blank"
          >
            Stanford Spezi
          </Link>{' '}
          framework. It provides guidance on using Spezi&apos;s modular components and best practices.
        </p>
        <p>
          You can learn more about Stanford Spezi at our{' '}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://spezi.stanford.edu/"
            target="_blank"
          >
            official website
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
};
