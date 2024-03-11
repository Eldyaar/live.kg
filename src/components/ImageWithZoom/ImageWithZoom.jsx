import { useState } from 'react';

const ImageWithZoom = (props) => {
   const [isHovered, setIsHovered] = useState(false)

   const handleMouseEnter = () => setIsHovered(true)
   const handleMouseLeave = () => setIsHovered(false)

   const zoomEffectStyles = {
      backgroundImage: `url('${props.imgUrl}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      transition: 'transform 0.5s ease-in-out',
   } 

   return (
      <div className={props.classOut}>
         <div 
            className={props.classInner}
            style={zoomEffectStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
         </div>
      </div>
   )
}

export default ImageWithZoom