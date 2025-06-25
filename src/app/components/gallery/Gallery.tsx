import styles from './Gallery.module.css'
import VerticalSpacer from "@/app/components/common/VerticalSpacer";

export default function Gallery() {
    return (
        <div>
            <VerticalSpacer size={80}/>
            <p className={styles.galleryTitle}>Gallery</p>
            <VerticalSpacer size={32}/>
            <p className={styles.galleryGuide}>사진을 클릭하시면 전체 화면 보기가 가능합니다</p>
        </div>
    )
}