import React, { useEffect, useState } from "react";
import { Image } from "./Image";
import { useNetworkContext } from "aptos-creator-studio-tools/providers/NetworkProvider";
import { useIndexerContext } from "aptos-creator-studio-tools/providers/IndexerProvider";

export function CollectionHeader ({collectionId}) {
    const {getCollectionData} = useIndexerContext();
    const {network} = useNetworkContext();
    const [collection, setCollection] = useState(null)
    useEffect(() => {
        const initCollections = async () => {
            const collectionData = await getCollectionData(collectionId);
            setCollection(collectionData)
        }
        initCollections();
    }, [network])
    if (!collection) return null;
    return (
        <div className='header-container'>
            <div >
                <Image uri={collection.uri} className='large-image'/>
            </div>
            <div className='header-text-container'>
                <h2>{collection.collection_name}</h2>
                <div>Created by <span><a href={`https://explorer.aptoslabs.com/account/${collection.creator_address}`} target='_blank'>{collection.creator_address}</a></span></div>
                <h5>{collection.description}</h5>
            </div>
        </div>
    );
}