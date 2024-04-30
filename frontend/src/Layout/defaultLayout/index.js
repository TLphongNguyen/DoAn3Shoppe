import classNames from "classnames/bind";
import styles from './defaultLayout.module.scss'
import Footer from './Footer';


const cx = classNames.bind(styles)

function DefaultLayout({children}) {
    return ( 
        <div>
            
            <div className={cx("wraper")}>
                
                    <div className={cx("content")}>
                        {children}
                    </div>
                    
                <Footer/>
                
            </div>
        </div>
     );
}

export default DefaultLayout;
