export default class Request {
    constructor( params ) {
        this.params  = params;
        if( !this.params.contentType ) {
            this.params.contentType = 'application/x-www-form-urlencoded; charset=utf-8';
        }

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = () => {
            if( this.request.readyState === XMLHttpRequest.DONE ) {
                if( this.request.status === 200 ) {
                    if( this.params.success ) {
                        this.params.success( JSON.parse( this.request.responseText ), this.request );
                    }
                } else {
                    if( this.params.error ) {
                        this.params.error( this.request.status, this.request );
                    }
                }

                if( this.params.complete ) {
                    this.params.complete( this.request.status, this.request );
                }
            }
        };
    }

    send( data ) {
        this.request.open( this.params.method, this.params.url, true );
        this.request.setRequestHeader( 'Content-Type', this.params.contentType );
        this.request.send( data );
    }
}
