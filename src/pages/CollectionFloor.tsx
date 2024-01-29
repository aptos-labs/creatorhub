import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListingItem } from "../components/ListingItem";
import { CollectionHeader } from "../components/CollectionHeader";
import { useIndexerContext } from "aptos-creator-studio-tools/providers/IndexerProvider";
import { useNetworkContext } from "aptos-creator-studio-tools/providers/NetworkProvider";

export function CollectionFloor() {
    const params = useParams();
    const {getCollectionsFloor} = useIndexerContext();
    const {network} = useNetworkContext();
    const [listings, setListings] = useState(null)
    useEffect(() => {
        if (getCollectionsFloor) {
            const initCollections = async () => {
                const listingsData = await getCollectionsFloor(params.collectionId as string);
                setListings(listingsData)
            }
            if (params.collectionId) {
                initCollections();
            }
        }
    }, [network])

    return (
        <div>
            <CollectionHeader collectionId={params.collectionId}/>
            {listings?.nft_marketplace_v2_current_nft_marketplace_listings?.slice(0,5).map(listing => (
                <ListingItem {...listing} key={listing.listing_id}/>
            ))}
        </div>
    );
}