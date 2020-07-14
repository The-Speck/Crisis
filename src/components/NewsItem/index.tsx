import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { Article } from '../../models';
import styles from './styles';

export interface NewsItemProps {
  article: Article;
}

const NewsItem = ({ article }: NewsItemProps): React.ReactElement<NewsItemProps> => {
  const { title, source, publishedAt } = article;

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={'transparent'}
      onPress={(): void => console.log('Pressed')}
    >
      <View style={[styles.wrapper]}>
        {article.urlToImage && <Image source={{ uri: article.urlToImage }} style={styles.img} />}
        <View style={[styles.info]}>
          <Text style={[styles.title]}>{title}</Text>
          <View style={[styles.bottom]}>
            <Text style={[styles.source]} onPress={(): void => console.log('pressed on text')}>
              {source.name}
            </Text>
            <Text style={[styles.date]}>{moment(publishedAt).fromNow()}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default NewsItem;
