import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useIndexerContext } from "aptos-creator-studio-tools/providers/IndexerProvider";
import { useNetworkContext } from "aptos-creator-studio-tools/providers/NetworkProvider";
import { ListingHeader } from "../components/ListingHeader";
// import { ListingActivity } from "../components/ListingActivity";

export function Listing() {
    const params = useParams();
    const {getListingData} = useIndexerContext();
    const {network} = useNetworkContext();
    const [listing, setListing] = useState(null)
    useEffect(() => {
        const initListing = async () => {
            const listingsData = await getListingData(params.listingId as string);
            setListing(listingsData)
        }
        if (params.listingId) {
            initListing();
        }
    }, [network])

    if (!listing) return null;
    return (
        <div>
            <ListingHeader listing={listing}/>
            {/* <ListingActivity listingId={listing.listing_id}/> */}
        </div>
    );
}