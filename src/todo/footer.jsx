import '../assets/styles/footer.styl'

export default{
    data(){
        return{
            author:'seanna'
        }
    },
    render(){
        return(
            <div id="footer">
                <span>Write By {this.author}</span>
            </div>
        )
    }
}



//jsx文件类似于js文件，可以通过render写html代码，通过data写变量，css文件需要拆分出来 