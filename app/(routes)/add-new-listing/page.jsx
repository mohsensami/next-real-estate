'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Select from 'react-select';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

import AsyncSelect from 'react-select/async';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

export default function AddNewListing() {
    // const filterColors = (inputValue) => {
    //     return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    // };
    const [inputCity, setInputCity] = useState('');
    const [options, setOptions] = useState([]);
    const { user } = useUser();
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const fetchCoordinates = async (cityName) => {
        // const url = `http://nominatim.openstreetmap.org/search?format=json&q=${cityName}&limit=1`;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=12a8d29b82f84621830a49c7da8e7829&language=en&pretty=1`;

        if (cityName.length === 6) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data);

                if (data.results.length > 0) {
                    const { results } = data;
                    const dataa = results.map((post) => ({
                        value: post.formatted,
                        label: post.formatted,
                        lat: post.geometry.lat,
                        lng: post.geometry.lng,
                    }));
                    return dataa;
                    // console.log(results);
                    // setOptions(results);
                    // setSelectedAddress(display_name);
                    // setCoordinates({ latitude: lat, longitude: lon });
                } else {
                    throw new Error('City not found');
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error);
                // setCoordinates(null);
            }
        }
    };

    const handleChange = (value) => {
        setOptions(value);
    };

    const nextHandler = async () => {
        setLoader(true);
        const { data, error } = await supabase
            .from('listing')
            .insert([
                {
                    address: { label: options.label },
                    coordinates: {
                        lat: options.lat,
                        lng: options.lng,
                    },
                    createdBy: user?.primaryEmailAddress.emailAddress,
                },
            ])
            .select();

        if (data) {
            setLoader(false);
            console.log('New Data added,', data);
            toast('New Address added for listing');
            router.replace('/edit-listing/' + data[0].id);
        }
        if (error) {
            setLoader(false);
            console.log('Error');
            toast('Server side error');
        }
    };

    return (
        <div className="mt-10 md:mx-56 lg:mx-80">
            <div
                className="p-10 flex flex-col
    gap-5 items-center justify-center"
            >
                <h2 className="font-bold text-3xl">Add New Listing</h2>
                <div
                    className="p-10  rounded-lg border
        w-full
        shadow-md flex flex-col gap-5"
                >
                    <h2 className="text-gray-500 text-lg">Enter Address which you want to list</h2>
                    <AsyncSelect
                        className="w-full"
                        // cacheOptions={options.map((item) => {
                        //     return {
                        //         value: item.formatted,
                        //         label: item.formatted,
                        //     };
                        // })}
                        // defaultOptions
                        loadOptions={fetchCoordinates}
                        onChange={handleChange}
                        placeholder="Search for a post..."
                        isClearable={true}
                    />
                    <Button disabled={!options?.label || loader} onClick={nextHandler}>
                        {loader ? <Loader className="animate-spin" /> : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// 'use client';
// // import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// // import { supabase } from '@/utils/supabase/client';
// import { useUser } from '@clerk/nextjs';
// import { Loader } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// // import { toast } from 'sonner';

// function AddNewListing() {
//     const [inputCity, setInputCity] = useState('');
//     const [selectedAddress, setSelectedAddress] = useState();
//     const [coordinates, setCoordinates] = useState();
//     const { user } = useUser();
//     const [loader, setLoader] = useState(false);
//     const router = useRouter();

// const fetchCoordinates = async (cityName) => {
//     // const url = `http://nominatim.openstreetmap.org/search?format=json&q=${cityName}&limit=1`;
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=12a8d29b82f84621830a49c7da8e7829&language=en&pretty=1`;

//     if (cityName.length === 6) {
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log(data);

//             if (data.results.length > 0) {
//                 const { results } = data;
//                 console.log(results);
//                 // setSelectedAddress(display_name);
//                 // setCoordinates({ latitude: lat, longitude: lon });
//             } else {
//                 throw new Error('City not found');
//             }
//         } catch (error) {
//             console.error('Error fetching coordinates:', error);
//             setCoordinates(null);
//         }
//     }
// };

// const handleOnchange = (e) => {
//     setInputCity(e.target.value);
//     fetchCoordinates(e.target.value);
// };

// const nextHandler = async () => {
//     console.log(selectedAddress, coordinates);
//     // setLoader(true);
//     // const { data, error } = await supabase
//     //     .from('listing')
//     //     .insert([
//     //         {
//     //             address: selectedAddress.label,
//     //             coordinates: coordinates,
//     //             createdBy: user?.primaryEmailAddress.emailAddress,
//     //         },
//     //     ])
//     //     .select();

//     // if (data) {
//     //     setLoader(false);
//     //     console.log('New Data added,', data);
//     //     toast('New Address added for listing');
//     //     router.replace('/edit-listing/' + data[0].id);
//     // }
//     // if (error) {
//     //     setLoader(false);
//     //     console.log('Error');
//     //     toast('Server side error');
//     // }
// };
//     return (
//         <div className="mt-10 md:mx-56 lg:mx-80">
//             <div
//                 className="p-10 flex flex-col
//     gap-5 items-center justify-center"
//             >
//                 <h2 className="font-bold text-3xl">Add New Listing</h2>
//                 <div
//                     className="p-10  rounded-lg border
//         w-full
//         shadow-md flex flex-col gap-5"
//                 >
//                     <h2 className="text-gray-500 text-lg">Enter Address which you want to list</h2>
//                     {/* <GoogleAddressSearch
//                         selectedAddress={(value) => setSelectedAddress(value)}
//                         setCoordinates={(value) => setCoordinates(value)}
//                     /> */}

//                     <Input value={inputCity} onChange={handleOnchange} />
//                     <Button
//                         // disabled={!selectedAddress || !coordinates || loader}
//                         onClick={nextHandler}
//                     >
//                         {loader ? <Loader className="animate-spin" /> : 'Next'}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddNewListing;
