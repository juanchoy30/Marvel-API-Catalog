import { Thumbnail } from './thumbnail/thumbnails';
import { Comic } from './comics/comics';
import { Story } from './stories/stories';
import { Url } from './url/url';

export class Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnails: Thumbnail[];
    resourceURI: string;
    comics: Comic[];
    series: Comic[];
    stories: Story[];
    events: Comic[];
    urls: Url[];
}