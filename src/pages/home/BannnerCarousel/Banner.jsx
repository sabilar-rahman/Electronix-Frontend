import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

export function Banner() {
  return (
    <div className="flex justify-center">
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full  max-w-xs lg:max-w-2xl  "
      >
        <CarouselContent className=" w-full h-full">
          {/* {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center ">
                   

                    <CarouselItem><img src="https://images.pexels.com/photos/27054224/pexels-photo-27054224/free-photo-of-motorbike-parked-on-hill-on-sea-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  /></CarouselItem>
                    <CarouselItem><img src="https://images.pexels.com/photos/20083342/pexels-photo-20083342/free-photo-of-whale-with-calf-in-sea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  /></CarouselItem>
                   
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))} */}
          <CarouselItem><img src="https://images.pexels.com/photos/5206323/pexels-photo-5206323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="processor" /></CarouselItem>
          <CarouselItem><img src="https://images.pexels.com/photos/2880732/pexels-photo-2880732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="keyboard" /></CarouselItem>
          <CarouselItem><img src="https://images.pexels.com/photos/18382829/pexels-photo-18382829/free-photo-of-top-view-of-colorful-keyboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="keyboard" /></CarouselItem>
          <CarouselItem><img src="https://images.pexels.com/photos/2582932/pexels-photo-2582932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Motherboard" /></CarouselItem>
          <CarouselItem><img src="https://images.pexels.com/photos/6704953/pexels-photo-6704953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="GPU" /></CarouselItem>

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
