import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function TodaysTheme() {
  return (
    <section>
      <div className="bg-fuchsia-600 rounded-2xl shadow-xl outline outline-1 outline-zinc-600 overflow-hidden md:flex md:flex-row-reverse">
        <div className="md:w-1/2 flex-shrink-0">
          <Image 
            className="w-full h-36 sm:h-full object-cover" 
            src="/images/space.jpg" 
            alt="Astronaut floating in deep space with Earth in the background."
            width={400}
            height={300}
          />
        </div>
        <div className="p-6 md:p-8 md:w-1/2 space-y-6">
          <p className="text-base font-normal text-white/90">Today&apos;s Theme</p>
          <h3 className="text-4xl font-extrabold text-orange-50 leading-tight">
            <FontAwesomeIcon icon="satellite-dish" className="mr-2" />
            Space Travel
          </h3>
          <div className="text-base leading-snug">
            <span className="font-bold">Astronauts actually grow taller in space.</span>
            <span className="font-normal"> Without gravity compressing their spines, astronauts can stretch up to 5-6 cm taller during their time in orbit.</span>
          </div>
          <button className="px-6 py-2 bg-white rounded-full text-neutral-900 text-sm font-bold hover:bg-gray-200 transition duration-150 shadow-md">
            <FontAwesomeIcon icon="play" className="mr-2" />
            Play a quiz on today&apos;s theme
          </button>
        </div>
      </div>
    </section>
  );
}
