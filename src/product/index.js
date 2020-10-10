import React, {useState} from 'react'
import Headers from './../templates/headers'
import './../assets/product.css'

export default function Index() {
    const [modal,setModal] = useState(false)
    const [cmodal,setCmodal] = useState('')
    const showModal = (c) => {
        setModal((prevState) => !prevState)
        setCmodal(c)
    }
    return (
        <>
            <Headers/>
            <div className="product-content">
                <div className="product-list">
                    <form className="search-box">
                        <input type="text" name="search" required placeholder="Search Product Code or Product Name here . . . "/>
                        <div className="svg-search">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7068 23.2226L16.8818 16.1133C18.2038 14.4123 18.9998 12.2509 18.9998 9.89673C18.9998 4.44053 14.7378 0.000976562 9.49988 0.000976562C4.26193 0.000976562 0 4.44048 0 9.89668C0 15.3529 4.26197 19.7924 9.49992 19.7924C11.7599 19.7924 13.8349 18.9633 15.4678 17.5862L22.2928 24.6955C22.4878 24.8986 22.7438 25.0007 22.9998 25.0007C23.2558 25.0007 23.5118 24.8986 23.7068 24.6955C24.0978 24.2882 24.0978 23.6299 23.7068 23.2226ZM9.49992 17.7091C5.36395 17.7091 2 14.205 2 9.89668C2 5.58837 5.36395 2.08426 9.49992 2.08426C13.6359 2.08426 16.9998 5.58837 16.9998 9.89668C16.9998 14.205 13.6359 17.7091 9.49992 17.7091Z" fill="black"/>
                            </svg>
                        </div>
                    </form>
                    <div className="list-box-container">
                        <div className="list-box">
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                            <div className="product-item">
                                <span>Product Code</span>
                                <span>Product Name</span>
                                <span>Packaging</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-form">
                    <div className="button-form">
                        <button onClick={() => showModal('category')} className="add-category">Add Category</button>
                        <i onClick={() => showModal('export')} className="export">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM39.0625 33.5938C39.0625 36.1784 36.9597 38.2812 34.375 38.2812H17.1875C14.6028 38.2812 12.5 36.1784 12.5 33.5938V16.4062C12.5 13.8216 14.6028 11.7188 17.1875 11.7188H25C25.8629 11.7188 26.5625 12.4184 26.5625 13.2812C26.5625 14.1441 25.8629 14.8438 25 14.8438H17.1875C16.326 14.8438 15.625 15.5447 15.625 16.4062V33.5938C15.625 34.4553 16.326 35.1562 17.1875 35.1562H34.375C35.2365 35.1562 35.9375 34.4553 35.9375 33.5938V25.7812C35.9375 24.9184 36.6371 24.2188 37.5 24.2188C38.3629 24.2188 39.0625 24.9184 39.0625 25.7812V33.5938ZM38.9117 17.0725C38.7475 17.4205 38.8043 17.3115 35.4798 20.6361C35.1747 20.9412 34.7749 21.0938 34.375 21.0938C32.9955 21.0938 32.2831 19.4135 33.2702 18.4265L33.6966 18.0001C29.7054 18.3453 26.5625 21.7021 26.5625 25.7812C26.5625 26.6441 25.8629 27.3438 25 27.3438C24.1371 27.3438 23.4375 26.6441 23.4375 25.7812C23.4375 19.9613 28.0068 15.1892 33.7463 14.8622L33.2701 14.386C32.6599 13.7759 32.6599 12.7865 33.2701 12.1764C33.8803 11.5661 34.8696 11.5661 35.4798 12.1764C38.875 15.5716 38.7856 15.4276 38.9435 15.8084C39.1186 16.2318 39.0931 16.6893 38.9117 17.0725V17.0725Z" fill="black"/>
                            </svg>
                        </i>
                        <i className="trash">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.2575 19.7832H17.7418C17.4131 19.7832 17.1453 20.0511 17.1453 20.3797V35.0947C17.1453 35.4234 17.4131 35.6913 17.7418 35.6913H32.2575C32.5862 35.6913 32.8541 35.4234 32.8541 35.0947V20.3797C32.8541 20.0505 32.5862 19.7832 32.2575 19.7832ZM20.8242 33.5037C20.8242 33.833 20.5569 34.1003 20.2276 34.1003C19.8983 34.1003 19.6311 33.833 19.6311 33.5037V22.1694C19.6311 21.8401 19.8983 21.5728 20.2276 21.5728C20.5569 21.5728 20.8242 21.8401 20.8242 22.1694V33.5037ZM23.2103 33.5037C23.2103 33.833 22.9431 34.1003 22.6138 34.1003C22.2845 34.1003 22.0172 33.833 22.0172 33.5037V22.1694C22.0172 21.8401 22.2845 21.5728 22.6138 21.5728C22.9431 21.5728 23.2103 21.8401 23.2103 22.1694V33.5037ZM25.5965 33.5037C25.5965 33.833 25.3293 34.1003 25 34.1003C24.6707 34.1003 24.4034 33.833 24.4034 33.5037V22.1694C24.4034 21.8401 24.6707 21.5728 25 21.5728C25.3293 21.5728 25.5965 21.8401 25.5965 22.1694V33.5037ZM27.9827 33.5037C27.9827 33.833 27.7154 34.1003 27.3862 34.1003C27.0563 34.1003 26.7896 33.833 26.7896 33.5037V22.1694C26.7896 21.8401 27.0563 21.5728 27.3862 21.5728C27.7154 21.5728 27.9827 21.8401 27.9827 22.1694V33.5037ZM30.3689 33.5037C30.3689 33.833 30.1016 34.1003 29.7723 34.1003C29.4424 34.1003 29.1758 33.833 29.1758 33.5037V22.1694C29.1758 21.8401 29.4424 21.5728 29.7723 21.5728C30.1016 21.5728 30.3689 21.8401 30.3689 22.1694V33.5037Z" fill="#DC3545"/>
                                <path d="M32.2576 14.6356H27.9822C27.6529 14.6356 27.3857 14.3684 27.3857 14.0391V13.5189C27.3857 13.1902 27.1178 12.9224 26.7891 12.9224H23.2098C22.8812 12.9224 22.6133 13.1902 22.6133 13.5189V14.0391C22.6133 14.3684 22.3461 14.6356 22.0168 14.6356H17.7413C17.4126 14.6356 17.1448 14.9035 17.1448 15.2322V15.9051C17.1448 16.2338 17.4126 16.5016 17.7413 16.5016H32.257C32.5857 16.5016 32.8536 16.2338 32.8536 15.9051V15.2322C32.8542 14.9035 32.5863 14.6356 32.2576 14.6356Z" fill="#DC3545"/>
                                <path d="M25 0C11.1924 0 0 11.193 0 25.0006C0 38.8082 11.193 50 25 50C38.807 50 50 38.8076 50 25.0006C50 11.193 38.807 0 25 0ZM34.0472 35.0941C34.0472 36.0802 33.2442 36.8838 32.2576 36.8838H17.7418C16.7552 36.8838 15.9522 36.0802 15.9522 35.0941V20.3798C15.9522 19.3931 16.7552 18.5901 17.7418 18.5901H32.2576C33.2442 18.5901 34.0472 19.3931 34.0472 20.3798V35.0941ZM34.0472 15.9057C34.0472 16.8924 33.2442 17.6953 32.2576 17.6953H17.7418C16.7552 17.6953 15.9522 16.8924 15.9522 15.9057V15.2328C15.9522 14.2461 16.7552 13.4431 17.7418 13.4431H21.4219C21.4619 12.4916 22.2487 11.7299 23.2098 11.7299H26.789C27.7495 11.7299 28.5375 12.4916 28.5769 13.4431H32.257C33.2431 13.4431 34.0466 14.2461 34.0466 15.2328L34.0472 15.9057Z" fill="#DC3545"/>
                            </svg>
                        </i>
                        <i className="edit">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="edit-svg" d="M50 25C50 38.8073 38.8073 50 25 50C11.1927 50 0 38.8073 0 25C0 11.1927 11.1927 0 25 0C38.8073 0 50 11.1927 50 25Z" fill="#FFC107"/>
                                <path d="M39.8537 10.1463C38.562 8.855 36.845 8.14355 35.0185 8.14355C33.1921 8.14355 31.4751 8.855 30.1834 10.1463L11.525 28.8051C11.3464 28.9836 11.2171 29.2049 11.1496 29.4483L8.21839 39.9772C8.07648 40.4876 8.22106 41.035 8.5968 41.4085C8.87528 41.6854 9.24797 41.835 9.62982 41.835C9.76334 41.835 9.898 41.8167 10.03 41.7793L20.5593 38.7885C21.0583 38.6466 21.4455 38.2511 21.5763 37.749C21.7072 37.2466 21.5626 36.7126 21.1964 36.3452L14.6721 29.8011L29.9107 14.5622L35.4343 20.0862L23.7083 31.7798C23.1358 32.3512 23.1342 33.2786 23.7057 33.8516C24.2771 34.4245 25.2045 34.4257 25.7774 33.8542L39.8537 19.8165C41.1453 18.5249 41.8564 16.8079 41.8564 14.9814C41.8564 13.1549 41.1449 11.4379 39.8537 10.1463V10.1463ZM17.3637 36.6504L11.7413 38.2476L13.316 32.59L17.3637 36.6504ZM37.7834 17.7432L37.5088 18.0171L31.982 12.4908L32.2552 12.218C32.9933 11.4799 33.9745 11.0732 35.0185 11.0732C36.0626 11.0732 37.0438 11.4799 37.7819 12.218C38.52 12.9562 38.9267 13.9373 38.9267 14.9814C38.9267 16.0251 38.52 17.0066 37.7834 17.7432Z" fill="white"/>
                            </svg>
                        </i>
                        <i className="add">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="add-svg" d="M25 0C11.2144 0 0 11.2144 0 25C0 38.7856 11.2144 50 25 50C38.7856 50 50 38.7856 50 25C50 11.2144 38.7856 0 25 0Z" fill="#28A745"/>
                                <path d="M35.9375 27.0832H27.0832V35.9374C27.0832 37.0876 26.1501 38.0207 25 38.0207C23.8498 38.0207 22.9167 37.0876 22.9167 35.9374V27.0832H14.0625C12.9123 27.0832 11.9792 26.1501 11.9792 25C11.9792 23.8498 12.9123 22.9167 14.0625 22.9167H22.9167V14.0625C22.9167 12.9123 23.8498 11.9792 25 11.9792C26.1501 11.9792 27.0832 12.9123 27.0832 14.0625V22.9167H35.9375C37.0876 22.9167 38.0207 23.8498 38.0207 25C38.0207 26.1501 37.0876 27.0832 35.9375 27.0832V27.0832Z" fill="#FAFAFA"/>
                            </svg>
                        </i>
                    </div>
                    <div className="form-box">
                        <form>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "30px 0"}}>
                                <div className="form-group">
                                    <input required type="text"/>
                                    <label>Product Name</label>
                                </div>
                                <div className="form-group">
                                    <input required type="text"/>
                                    <label>Packaging</label>
                                </div>
                            </div>
                            <div className="form-groups">
                                    <input required type="text"/>
                                    <label>Product Name</label>
                            </div>
                            <div className="form-groups">
                                <textarea placeholder="Product Description"></textarea>
                            </div>
                            <div className="form-groups">
                                <select defaultValue={`Product Category`}>
                                    <option>Product Category</option>
                                </select>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "30px 0"}}>
                                <div className="form-group">
                                    <input required type="date"/>
                                </div>
                                <div className="form-group">
                                    <input required type="text"/>
                                    <label>Packaging</label>
                                </div>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "30px 0"}}>
                                <div className="form-group">
                                    <input required type="text"/>
                                    <label>Product Name</label>
                                </div>
                                <div className="form-group">
                                    <input required type="text"/>
                                    <label>Packaging</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={modal === true ? "global-shadow":""}></div>
            <div className={modal === true ? "modal-box show-modal":"modal-box"}>
                <div className="category-action">
                    <i onClick={() => setModal((prevState) => !prevState)} className="back">
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.5829 13.7987C23.2401 9.36751 18.9782 6.34356 13.8696 6.25374V1.0741C13.8696 0.834581 13.6653 0.625 13.4318 0.625C13.3442 0.625 13.2566 0.65494 13.169 0.71482L0.178798 10.3555C-0.0255426 10.5052 -0.0547341 10.7747 0.0912236 10.9843C0.120415 11.0142 0.149607 11.0442 0.178798 11.0741L13.169 20.6549C13.3734 20.8046 13.6361 20.7448 13.7821 20.5651C13.8404 20.4753 13.8696 20.3855 13.8696 20.2957V15.146C17.0223 15.146 19.6787 16.6729 20.6129 18.9783C21.4011 20.9543 20.7588 23.0801 18.8906 24.8466C18.7154 25.0262 18.6862 25.2957 18.8614 25.4753C18.949 25.5651 19.0657 25.625 19.1825 25.625H19.5328C19.6204 25.625 19.7079 25.5951 19.7663 25.5352C24.0575 22.631 25.8965 18.11 24.5829 13.7987Z" fill="black"/>
                        </svg>
                    </i>
                    {cmodal === 'category' ? <i className="save-category">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="fill-svg" d="M12.5 0C5.60722 0 0 5.60722 0 12.5C0 19.3928 5.60722 25 12.5 25C19.3928 25 25 19.3928 25 12.5C25 5.60722 19.3928 0 12.5 0Z" fill="#2196F3"/>
                            <path d="M17.9687 13.5417H13.5416V17.9688C13.5416 18.5439 13.075 19.0105 12.5 19.0105C11.9249 19.0105 11.4584 18.5439 11.4584 17.9688V13.5417H7.03123C6.45616 13.5417 5.98962 13.0752 5.98962 12.5001C5.98962 11.925 6.45616 11.4585 7.03123 11.4585H11.4584V7.03135C11.4584 6.45628 11.9249 5.98975 12.5 5.98975C13.075 5.98975 13.5416 6.45628 13.5416 7.03135V11.4585H17.9687C18.5438 11.4585 19.0103 11.925 19.0103 12.5001C19.0103 13.0752 18.5438 13.5417 17.9687 13.5417V13.5417Z" fill="#FAFAFA"/>
                        </svg>
                    </i>
                    :""}
                </div>
                <form className="form-modal">
                {cmodal === 'category' ?
                    <div className="form-group">
                        <input type="text" required />
                        <label>Category Name</label>
                    </div>
                    : cmodal === 'export' ? <>
                    <div className="form-group">
                        <input type="date" required/>
                    </div>
                    <div className="form-group">
                        <input type="date" required/>
                    </div>
                    <div className="form-group">
                        <div className="export-group">
                            <svg className="pdf" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                <path d="M24.2685 37.645C23.6682 37.645 23.2805 37.6981 23.0509 37.7508V45.5322C23.2809 45.5854 23.6515 45.5854 23.9863 45.5854C26.4207 45.6025 28.0091 44.2622 28.0091 41.4211C28.0263 38.9505 26.5798 37.645 24.2685 37.645Z" fill="black"/>
                                <path d="M13.8742 37.6099C13.3275 37.6099 12.957 37.6625 12.7623 37.7152V41.227C12.9921 41.2796 13.2746 41.2978 13.6613 41.2978C15.0917 41.2978 15.9735 40.574 15.9735 39.3566C15.9736 38.2628 15.2144 37.6099 13.8742 37.6099Z" fill="black"/>
                                <path d="M43.1277 11.9818C43.1248 11.7525 43.0521 11.526 42.8946 11.347L33.2538 0.33533C33.2519 0.332243 33.2482 0.331245 33.2462 0.328431C33.1887 0.264252 33.1227 0.211329 33.0518 0.164669C33.0308 0.151053 33.0087 0.138798 32.9867 0.126361C32.9254 0.0931371 32.8612 0.0655409 32.7933 0.0453884C32.7761 0.0401234 32.7588 0.0326797 32.7406 0.0279593C32.6679 0.0103486 32.5923 0 32.5166 0H8.82357C7.7426 0 6.86279 0.8799 6.86279 1.96087V48.0392C6.86279 49.1206 7.7426 50.0001 8.82357 50.0001H41.1765C42.2574 50.0001 43.1373 49.1206 43.1373 48.0392V12.0917C43.1372 12.0548 43.1315 12.0187 43.1277 11.9818ZM17.5437 42.1089C16.6265 42.9734 15.2677 43.3622 13.6794 43.3622C13.327 43.3622 13.0085 43.3441 12.7624 43.3096V47.5615H10.0981V35.8274C10.927 35.6867 12.0922 35.5804 13.7334 35.5804C15.3916 35.5804 16.574 35.8982 17.3678 36.533C18.1269 37.1332 18.6373 38.1213 18.6373 39.2855C18.6373 40.4506 18.25 41.4387 17.5437 42.1089ZM28.89 46.1502C27.6386 47.1909 25.7329 47.6849 23.4045 47.6849C22.0103 47.6849 21.0227 47.5969 20.3511 47.5088V35.8274C21.3393 35.6694 22.628 35.5804 23.9863 35.5804C26.2437 35.5804 27.7085 35.9863 28.856 36.8508C30.0915 37.7684 30.868 39.2329 30.868 41.3324C30.867 43.6092 30.0379 45.1794 28.89 46.1502ZM39.903 37.8744H35.3323V40.5915H39.6024V42.7801H35.3323V47.5615H32.6334V35.6694H39.903V37.8744ZM8.82357 33.2926V1.96087H31.5362V11.9931C31.5362 12.5342 31.9748 12.9735 32.5166 12.9735H41.1765L41.1774 33.2926H8.82357Z" fill="black"/>
                                <path d="M35.0586 21.0724C35.0012 21.067 33.6196 20.9409 31.499 20.9409C30.8346 20.9409 30.1654 20.9539 29.5047 20.9788C25.3169 17.8361 21.8868 14.691 20.0505 12.9283C20.084 12.7343 20.107 12.5808 20.1177 12.463C20.3599 9.90628 20.0907 8.18025 19.3202 7.33276C18.8156 6.77893 18.0746 6.59465 17.3019 6.80571C16.8221 6.93143 15.9338 7.39694 15.6494 8.34456C15.3354 9.39176 15.8402 10.6627 17.1661 12.1366C17.1872 12.1589 17.6372 12.6304 18.4548 13.4293C17.9234 15.9632 16.5323 21.4311 15.8574 24.0569C14.2722 24.9039 12.9514 25.9242 11.9288 27.0947L11.8619 27.1713L11.8186 27.2633C11.7133 27.4845 11.2099 28.6328 11.5878 29.5553C11.7604 29.9747 12.0837 30.2811 12.523 30.4419L12.6407 30.4736C12.6407 30.4736 12.7469 30.4966 12.9337 30.4966C13.7516 30.4966 15.7704 30.0667 16.8533 26.0762L17.1157 25.0651C20.8955 23.2279 25.6204 22.6352 29.0451 22.4701C30.8067 23.7764 32.5597 24.9765 34.2582 26.0392L34.3137 26.0714C34.396 26.1135 35.1409 26.4812 36.0131 26.4821C37.2597 26.4821 38.1702 25.7171 38.5091 24.3839L38.5263 24.2928C38.6211 23.5309 38.4296 22.8442 37.9729 22.3073C37.0109 21.1764 35.2196 21.0778 35.0586 21.0724ZM12.9642 29.0253C12.9565 29.0162 12.9529 29.0076 12.9491 28.998C12.8678 28.8022 12.9653 28.3273 13.1089 27.9793C13.7255 27.29 14.4656 26.6572 15.3196 26.0874C14.4879 28.7797 13.2784 29.0125 12.9642 29.0253ZM18.2448 11.1378C16.9676 9.71601 16.9868 9.01113 17.0555 8.77384C17.1682 8.37724 17.6771 8.22736 17.6815 8.226C17.9378 8.15629 18.0934 8.16999 18.2319 8.32204C18.5452 8.66618 18.8143 9.70476 18.708 11.6098C18.4064 11.3068 18.2448 11.1378 18.2448 11.1378ZM17.5849 23.2449L17.6069 23.1607L17.604 23.1617C18.2436 20.6569 19.1659 16.9892 19.6962 14.6333L19.7153 14.6516L19.7172 14.6403C21.4329 16.2559 24.0636 18.6191 27.2135 21.077L27.1781 21.0785L27.2302 21.1178C24.2629 21.3684 20.7188 21.9534 17.5849 23.2449ZM37.0721 24.0667C36.8462 24.8969 36.4116 25.0104 36.0132 25.0104C35.5508 25.0104 35.1056 24.8179 35.0042 24.7715C33.8476 24.0465 32.6643 23.2566 31.4703 22.4114C31.4798 22.4114 31.4885 22.4114 31.499 22.4114C33.5459 22.4114 34.9093 22.5357 34.9628 22.5395C35.3047 22.5522 36.3866 22.712 36.8528 23.2601C37.0356 23.475 37.1056 23.7318 37.0721 24.0667Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0">
                                <rect width="50" height="50" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <svg className="excel" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M48.4375 7.81363H28.125V3.12613C28.125 2.6605 27.9188 2.21988 27.5594 1.923C27.2031 1.62613 26.725 1.498 26.275 1.59175L1.275 6.27925C0.534375 6.41675 0 7.0605 0 7.81363V42.1886C0 42.9386 0.534375 43.5855 1.275 43.723L26.275 48.4105C26.3687 48.4293 26.4656 48.4386 26.5625 48.4386C26.925 48.4386 27.2781 48.3136 27.5594 48.0793C27.9188 47.7824 28.125 47.3386 28.125 46.8761V42.1886H48.4375C49.3 42.1886 50 41.4886 50 40.6261V9.37613C50 8.51363 49.3 7.81363 48.4375 7.81363ZM21.4875 30.223C22.0562 30.8699 21.9906 31.8574 21.3406 32.4261C21.0437 32.6855 20.6781 32.8136 20.3125 32.8136C19.8781 32.8136 19.4469 32.6324 19.1375 32.2793L14.5938 27.0886L10.6094 32.2136C10.3 32.6074 9.8375 32.8136 9.375 32.8136C9.04062 32.8136 8.70313 32.7074 8.41563 32.4855C7.73438 31.9543 7.6125 30.973 8.14063 30.2918L12.4969 24.6918L8.2 19.7793C7.63125 19.1324 7.69687 18.1449 8.34688 17.5761C8.99375 17.0074 9.97813 17.0699 10.5531 17.723L14.4531 22.1793L19.0812 16.2293C19.6125 15.5511 20.5938 15.4261 21.275 15.9574C21.9563 16.4855 22.0781 17.4668 21.5469 18.1511L16.5469 24.5761L21.4875 30.223ZM46.875 39.0636H28.125V35.9386H32.8125C33.675 35.9386 34.375 35.2386 34.375 34.3761C34.375 33.5136 33.675 32.8136 32.8125 32.8136H28.125V29.6886H32.8125C33.675 29.6886 34.375 28.9886 34.375 28.1261C34.375 27.2636 33.675 26.5636 32.8125 26.5636H28.125V23.4386H32.8125C33.675 23.4386 34.375 22.7386 34.375 21.8761C34.375 21.0136 33.675 20.3136 32.8125 20.3136H28.125V17.1886H32.8125C33.675 17.1886 34.375 16.4886 34.375 15.6261C34.375 14.7636 33.675 14.0636 32.8125 14.0636H28.125V10.9386H46.875V39.0636Z" fill="black"/>
                                <path d="M42.1875 14.0635H39.0625C38.2 14.0635 37.5 14.7635 37.5 15.626C37.5 16.4885 38.2 17.1885 39.0625 17.1885H42.1875C43.05 17.1885 43.75 16.4885 43.75 15.626C43.75 14.7635 43.05 14.0635 42.1875 14.0635Z" fill="black"/>
                                <path d="M42.1875 20.3135H39.0625C38.2 20.3135 37.5 21.0135 37.5 21.876C37.5 22.7385 38.2 23.4385 39.0625 23.4385H42.1875C43.05 23.4385 43.75 22.7385 43.75 21.876C43.75 21.0135 43.05 20.3135 42.1875 20.3135Z" fill="black"/>
                                <path d="M42.1875 26.5635H39.0625C38.2 26.5635 37.5 27.2635 37.5 28.126C37.5 28.9885 38.2 29.6885 39.0625 29.6885H42.1875C43.05 29.6885 43.75 28.9885 43.75 28.126C43.75 27.2635 43.05 26.5635 42.1875 26.5635Z" fill="black"/>
                                <path d="M42.1875 32.8135H39.0625C38.2 32.8135 37.5 33.5135 37.5 34.376C37.5 35.2385 38.2 35.9385 39.0625 35.9385H42.1875C43.05 35.9385 43.75 35.2385 43.75 34.376C43.75 33.5135 43.05 32.8135 42.1875 32.8135Z" fill="black"/>
                            </svg>
                            <svg className="csv" width="46" height="50" viewBox="0 0 46 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.3379 17.8848H41.1375V12.0912C41.1375 12.0548 41.1316 12.0187 41.1269 11.9818C41.125 11.752 41.0517 11.5258 40.8942 11.3471L31.254 0.335315C31.2512 0.332214 31.2482 0.331302 31.2462 0.328475C31.1889 0.264002 31.1219 0.210655 31.051 0.164694C31.0299 0.150376 31.0089 0.138613 30.9868 0.126484C30.9255 0.0931987 30.8604 0.0652026 30.7934 0.0450491C30.7752 0.0403071 30.759 0.0328293 30.7409 0.0279049C30.6679 0.0107607 30.5923 0 30.5159 0H6.82359C5.74168 0 4.86285 0.879916 4.86285 1.96082V17.8842H3.66249C2.11476 17.8842 0.859863 19.1386 0.859863 20.6866V35.26C0.859863 36.8072 2.11476 38.0629 3.66249 38.0629H4.86285V48.0393C4.86285 49.1203 5.74168 50 6.82359 50H39.1766C40.2575 50 41.1375 49.1203 41.1375 48.0393V38.063H42.3379C43.8851 38.063 45.1402 36.8078 45.1402 35.2606V20.6871C45.1403 19.1387 43.8851 17.8848 42.3379 17.8848ZM6.82359 1.96082H29.5354V11.9925C29.5354 12.5342 29.9747 12.9729 30.5158 12.9729H39.1766V17.8847H6.82359V1.96082ZM21.5841 28.5596C19.1511 27.7124 17.5659 26.3662 17.5659 24.2381C17.5659 21.7391 19.6507 19.8273 23.1043 19.8273C24.7555 19.8273 25.972 20.1749 26.8403 20.5666L26.1025 23.2386C25.5162 22.9552 24.4736 22.5426 23.0394 22.5426C21.6061 22.5426 20.911 23.1945 20.911 23.9547C20.911 24.8892 21.736 25.3015 23.6267 26.0186C26.2112 26.9742 27.4277 28.3202 27.4277 30.3843C27.4277 32.8382 25.5381 34.9244 21.5192 34.9244C19.8469 34.9244 18.1953 34.4889 17.3702 34.0335L18.0432 31.2962C18.9343 31.7535 20.3025 32.2087 21.715 32.2087C23.2353 32.2087 24.0393 31.5788 24.0393 30.6223C24.0388 29.7095 23.3433 29.1887 21.5841 28.5596ZM4.33558 27.6032C4.33558 22.6076 7.89884 19.8273 12.329 19.8273C14.0454 19.8273 15.3486 20.1749 15.9356 20.4793L15.2615 23.1071C14.5885 22.8258 13.6536 22.5655 12.4809 22.5655C9.85255 22.5655 7.81129 24.1499 7.81129 27.4077C7.81129 30.3403 9.54861 32.1862 12.5037 32.1862C13.502 32.1862 14.61 31.9693 15.2615 31.7085L15.7615 34.2935C15.153 34.598 13.785 34.9244 12.0036 34.9244C6.94241 34.9245 4.33558 31.7736 4.33558 27.6032ZM39.1766 47.5078H6.82359V38.063H39.1766V47.5078ZM36.9866 34.7063H33.1201L28.4282 20.0666H32.0565L33.8371 26.258C34.3368 27.9949 34.7927 29.6674 35.1411 31.4922H35.2057C35.5749 29.7324 36.0306 27.9948 36.5304 26.3222L38.3987 20.0666H41.9186L36.9866 34.7063Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    </>:""}
                </form>

               
            </div>
        </>
    )
}
