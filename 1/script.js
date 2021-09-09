console.log("KUALITAS BARANG A");

    var harga = 4550;
    var qty = 15;
    var diskon = qty * 231;
    var total = qty * harga;
    var bayar = total - diskon;

    if (qty >= 13) 
    {
        console.log("Total harga barang = "+ total);
        console.log("Diskon = "+ diskon);
        console.log("Bayar = " + bayar);
    }
    else
    {
        console.log("Total harga barang = "+ total);
    }
    
    console.log("================================");
    console.log("KUALITAS BARANG B");

    var harga = 5330;
    var qty = 17;
    var total = qty * harga;
    var diskon = total * 23 / 100 ;
    var bayar = total - diskon;
    
    if (qty >= 7) 
    {
        console.log("Total harga barang = "+ total);
        console.log("Diskon = "+ diskon);
        console.log("Bayar = " + bayar);
    }
    else
    {
        console.log("Total harga barang = "+ total);
    }

    console.log("================================");
    console.log("KUALITAS BARANG C");

    var harga = 8653;
    var qty = 10;
    var total = qty * harga;
    
    if (qty >= 0) 
    {
        console.log("Total harga barang = "+ total);
    }
