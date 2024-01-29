import React, { useEffect, useState } from "react";
import { CollectionItem } from "./CollectionItem";
import { useNetworkContext } from "aptos-creator-studio-tools/providers/NetworkProvider";
import { useIndexerContext } from "aptos-creator-studio-tools/providers/IndexerProvider";

export function CollectionList() {
    const {network} = useNetworkContext()
    const {getTopCollections} = useIndexerContext();
    const [collections, setCollections] = useState([])
    useEffect(() => {
        const initCollections = async () => {
            const collectionData = await getTopCollections();
            setCollections(collectionData);
        }
        initCollections();
    }, [network])

    return (
        collections.map(collection => (
            <CollectionItem {...collection} key={collection.collection_id}/>
        ))
    );
}

